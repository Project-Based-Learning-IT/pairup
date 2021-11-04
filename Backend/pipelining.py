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


def save_usernames_insequence(user_emails):
    with open('user_emails.txt', 'w', encoding="utf-8") as f:
        for email in user_emails:
            f.write(email + '\n')


def read_usernames_insequence():
    with open('user_emails.txt', 'r', encoding="utf-8") as f:
        user_emails = list(map(lambda x: x.strip('\n'), f.readlines()))
    return user_emails

#this function takes input of user and skill map
#format - {'username': [skill1, skill2, ...]}
#TODO: make the fetching function pass input of format
#format - {'official user email': [skill1, skill2, ...]}
#Email is unique and is used to identify the user (no repetition)
#rest code will work exactly the same as before.
def user_data_matrix(user_email_skill_dict, Allskills):
    UserSkills = []
    UserEmails = []
    for email, skill_list in user_email_skill_dict.items():
        if(email != None):
            UserEmails.append(email.lower())
            oneHotSkillList = []
            for skill in Allskills:
                if(skill in skill_list):
                    oneHotSkillList.append(1)
                else:
                    oneHotSkillList.append(0)
            UserSkills.append(oneHotSkillList)
    #TODO: write emails in same sequence to text file and read also from text file
    save_usernames_insequence(UserEmails)
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

#TODO: pass list of emails here
def recommendUsers(target_user_skills, target_user_domains, UserEmails):

    #No of suggestions to return
    topn_skill_based = 10
    topn_domain_based = 10

    skill_based_model = joblib.load('KNN_user_skills.pkl', mmap_mode='r')
    domain_based_model = joblib.load('KNN_user_domains.pkl', mmap_mode='r')

    skills_based_similar_user_distances, skills_based_similar_user_index = skill_based_model.kneighbors([
                                                                                                   target_user_skills], topn_skill_based)
    domains_based_similar_user_distances, domains_based_similar_user_index = domain_based_model.kneighbors([
                                                                                                      target_user_domains], topn_domain_based)
    #feature add a cutoff value using returned distances

    Suggestions = list()
    for usr_indx in skills_based_similar_user_index[0]:
        if(UserEmails[usr_indx] not in Suggestions):
            Suggestions.append(UserEmails[usr_indx])
    for usr_indx in domains_based_similar_user_index[0]:
        if(UserEmails[usr_indx] not in Suggestions):
            Suggestions.append(UserEmails[usr_indx])
    return Suggestions

# =======================================================================================================================
#                         MAIN LOGIC
# =======================================================================================================================


def update_models(skill_domain_dict, usermail_skill_dict):
    skills, SkillDomains = get_skills_n_domains(skill_domain_dict)
    UserSkills = user_data_matrix(
        usermail_skill_dict, skills)  # usermail-skills-data-matrix
    UserDomains = weights(UserSkills, SkillDomains)
    create_models(UserSkills, UserDomains)
    # add return statement to see if everything went down properly


def predict(target_user_skills):
    """
    input: target_user_skills - [skill1, skill2, ...]
    """
    #TODO: replace recomended usernames with emails
    UserEmails = read_usernames_insequence()  # [1]
    encoded_target_user_skills, encoded_target_user_domains = get_target_user_data(
        target_user_skills)
    suggestions = recommendUsers(
        encoded_target_user_skills, encoded_target_user_domains, UserEmails)
    return suggestions


"""
[1] Suppose a model is trained today, now in next 3 days some users have updated/deleted their
profile. This means their data is not present in database but is considered in model.pkl file.
This pkl file will be updated after some days so till then we are saving the previous sequence of
usernames so the returned indexes for a target user match the correct users.
These recommended users may not be present in database and we will have to do error handling there.
"""
