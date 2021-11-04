import pandas as pd
import numpy as np
import json
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
import joblib


#As this function is receiving a skill_domain_dict as input
#if there are changes in input the weights will be changed accordingly
#create a function to collect user preferences for skill and domain
#assign weights accordingly. (feature)
def get_skills_n_domains(skill_domain_dict):
    json.dump(skill_domain_dict, open('skill_domain_dict.json', 'w'))
    skills = set()
    domains = set()
    skill_domain_map = {}
    for element in skill_domain_dict:
        domains.add(element['domain_name'])
        skillsList = []
        for skill in element['skills']:
            skills.add(skill['skill_name'])
            skillsList.append(skill['skill_name'])
        skill_domain_map[element['domain_name']] = skillsList
    skills = list(skills)
    domains = list(domains)
    print("Total Skills - {}".format(len(skills)))
    print("Total Domains - {}".format(len(domains)))
    skills.sort()
    domains.sort()

    SkillDomains = []
    for skill in skills:
        oneHotSkillDomainList = []
        for domain in domains:
            if(skill in skill_domain_map[domain]):
                oneHotSkillDomainList.append(1)
            else:
                oneHotSkillDomainList.append(0)
        oneHotSkillDomainList.insert(0, skill)
        SkillDomains.append(oneHotSkillDomainList)
    # print(SkillDomains)

    columns = []
    columns.extend(domains)
    columns.insert(0, 'SkillName')
    df_skill_n_domains = pd.DataFrame(SkillDomains, columns=columns)
    df_skill_n_domains.to_csv('skill_n_domain.csv', index=False)

    SkillDomainsOneHot = []
    for skill in skills:
        onehot = []
        for domain in domains:
            if(skill in skill_domain_map[domain]):
                onehot.append(1)
            else:
                onehot.append(0)
        SkillDomainsOneHot.append(onehot)
    # print(SkillDomainsOneHot)

    return skills, SkillDomainsOneHot


def get_user_names(user_skill_dict):
    UserNames = []
    for username, skill_list in user_skill_dict.items():
        UserNames.append(username)
    return UserNames


def create_models(UserSkills, UserDomains):
    user_skill_features = csr_matrix(UserSkills)
    user_domain_features = csr_matrix(UserDomains)

    skill_based_model = NearestNeighbors(
        metric='cosine', n_neighbors=10, n_jobs=-1)
    domain_based_model = NearestNeighbors(
        metric='cosine', n_neighbors=10, n_jobs=-1)

    skill_based_model.fit(user_skill_features)
    domain_based_model.fit(user_domain_features)

    joblib.dump(skill_based_model, 'KNN_user_skills.pkl')
    joblib.dump(domain_based_model, 'KNN_user_domains.pkl')


def save_usernames_insequence(usernames):
    with open('usernames.txt', 'w', encoding="utf-8") as f:
        for username in usernames:
            f.write(username + '\n')


def read_usernames_insequence():
    with open('usernames.txt', 'r', encoding="utf-8") as f:
        usernames = list(map(lambda x: x.strip('\n'), f.readlines()))
    return usernames

#this function takes input of user and skill map
#format - {'username': [skill1, skill2, ...]}
#TODO: make the fetching function pass input of format
#format - {'official user email': [skill1, skill2, ...]}
#Email is unique and is used to identify the user (no repetition)
#rest code will work exactly the same as before.
def user_data_matrix(user_skill_dict, Allskills):
    UserSkills = []
    UserNames = []
    for username, skill_list in user_skill_dict.items():
        if(username != None):
            UserNames.append(username.lower())
            oneHotSkillList = []
            for skill in Allskills:
                if(skill in skill_list):
                    oneHotSkillList.append(1)
                else:
                    oneHotSkillList.append(0)
            UserSkills.append(oneHotSkillList)
    # write usernames in same sequence to text file and read also from text file
    save_usernames_insequence(UserNames)
    return UserSkills


def weights(UserSkills, SkillDomains):
    UserSkills = np.array(UserSkills, dtype=np.float64)
    SkillDomains = np.array(SkillDomains, dtype=np.float64)
    UserDomains = np.dot(UserSkills, SkillDomains)
    return UserDomains


def get_target_user_data(target_user_skills):
    target_skills = []
    df_skill_n_domain = pd.read_csv('skill_n_domain.csv')
    skills = df_skill_n_domain['SkillName'].values
    for skill in skills:
        if(skill in target_user_skills):
            target_skills.append(1)
        else:
            target_skills.append(0)
    target_skills = np.array(target_skills, dtype=np.float64)
    SkillDomains = np.array(
        df_skill_n_domain.iloc[:, 1:].values, dtype=np.float64)
    target_domains = np.dot(target_skills, SkillDomains)
    return target_skills, target_domains


def recommendUsers(target_user_skills, target_user_domains, UserNames):
    skill_based_model = joblib.load('KNN_user_skills.pkl', mmap_mode='r')
    domain_based_model = joblib.load('KNN_user_domains.pkl', mmap_mode='r')

    # TODO: See this return distances parameter and how to access these distances
    skills_based_similar_user_distances, skills_based_similar_users = skill_based_model.kneighbors([
                                                                                                   target_user_skills], 10)
    domains_based_similar_user_distances, domains_based_similar_users = domain_based_model.kneighbors([
                                                                                                      target_user_domains], 10)

    # skill_based_user_names = []
    # domain_based_user_names = []

    # # cutoff = 0.5
    # for usr_indx in skills_based_similar_users[0]:
    #     skill_based_user_names.append(UserNames[usr_indx])
    # for usr_indx in domains_based_similar_users[0]:
    #     domain_based_user_names.append(UserNames[usr_indx])

    Suggestions = list()
    for usr_indx in skills_based_similar_users[0]:
        if(UserNames[usr_indx] not in Suggestions):
            Suggestions.append(UserNames[usr_indx])
    for usr_indx in domains_based_similar_users[0]:
        if(UserNames[usr_indx] not in Suggestions):
            Suggestions.append(UserNames[usr_indx])
    return Suggestions

# =======================================================================================================================
#                         MAIN LOGIC
# =======================================================================================================================


def update_models(skill_domain_dict, user_skill_dict):
    skills, SkillDomains = get_skills_n_domains(skill_domain_dict)
    UserSkills = user_data_matrix(
        user_skill_dict, skills)  # user-skill-data-matrix
    UserDomains = weights(UserSkills, SkillDomains)
    create_models(UserSkills, UserDomains)
    # add return statement to see if everything went down properly


def predict(target_user_skills):
    """
    input: target_user_skills - dict{"username": [skill1, skill2, ...]}
    """
    UserNames = read_usernames_insequence()  # [1]
    encoded_target_user_skills, encoded_target_user_domains = get_target_user_data(
        target_user_skills)
    suggestions = recommendUsers(
        encoded_target_user_skills, encoded_target_user_domains, UserNames)
    return suggestions


"""
[1] Suppose a model is trained today, now in next 3 days some users have updated/deleted their
profile. This means their data is not present in database but is considered in model.pkl file.
This pkl file will be updated after some days so till then we are saving the previous sequence of
usernames so the returned indexes for a target user match the correct users.
These recommended users may not be present in database and we will have to do error handling there.
"""
