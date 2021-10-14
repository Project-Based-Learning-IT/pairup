# PairUp

<li> Clone the repository using following command or github desktop

<p><code>git clone https://github.com/Project-Based-Learning-IT/CollegeSpace.git</code></p>

</li>

  

## Frontend

  

Env Setup : https://reactnative.dev/docs/environment-setup

<ol>

<li>

Navigate to the cloned repository

<p><code>cd CollegeSpace</code></p>

<p><code>cd frontend</code></p>

<p><code>yarn install</code></p>

If yarn is not found <code>npm install -g yarn</code>

</li>

<li>

[For Wireless Connection to JS server using android device]

Open a terminal from the current directory i.e. <code>CollegeSpace/frontend</code> and run the following command to start the metro bundler

<p><code>npx react-native start</code></p>

</li>

<li>

[Android] Let Metro Bundler of previous step run in its own terminal. Open a new terminal inside from the current directory i.e. <code>CollegSpace/frontend</code>. Run the following:

<p><code>npx react-native run-android</code></p>

<p>[Make sure to use<code>yarn install</code> if there are errors]</p>

</li>

<li>

[Errors and solutions]

<p>Error: mergeLibDexDebug FAILED </p>

<p>Solution: fixed by enabling the multiDex in the /android/app/build.gradle file.

<br  />

android { <br  />

defaultConfig { <br  />

....... <br  />

multiDexEnabled true <br  />

} <br  />

......<br  />

}</p>

</ol>

### Frontend References
[https://reactnative.dev/](https://reactnative.dev/) <br>
[https://callstack.github.io/react-native-paper/](https://callstack.github.io/react-native-paper/) <br>
[https://reactnavigation.org/](https://reactnavigation.org/) <br>
https://www.npmjs.com/package/react-native-deck-swiper <br>
https://www.npmjs.com/package/react-native-flip-card <br>
https://www.npmjs.com/package/react-native-hyperlink <br>
<br>

  
  

## Backend

  

Navigate to the cloned repository

  

cd CollegeSpace

cd backend

Run the following commands one by one:

  

pip install virtualenv

virtualenv env

.\env\Scripts\activate.bat (For subsequent run)

Install requirements if not done already - `pip install -r requirements.txt`

Install a python formatter in VSCode outside of virtual environment

<br>

To exit virtual environment use `deactivate`

<br>

Formatter -

1. Open pyton file and press `ctrl+shift+p` to bring up command pallet and search format

2. Click format document with and install python formatter when prompted by Vscode

3. Repeat step 1 to search and choose default formatter to installed one

4. Also turn on format on save from VScode settings

  

* Use SQLALCHEMY_DATABASE_URI of clever cloud after login.

* Manage Tables, database using inbuilt phpMyAdmin of Clevercloud

https://console.clever-cloud.com/

Same email and password

* Documentation Flask : https://flask.palletsprojects.com/en/2.0.x/

* Documentation SQLAlchemy: https://flask-sqlalchemy.palletsprojects.com/en/2.x/

* Documentation JWT: https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage/

* To start flask server <br>

`python app.py`

  

### Heroku

  

pip install gunicorn

pip freeze > requirements.txt

Inside Procfile:

  

web: gunicorn <main_file_name>:<flask_app_name>

  

* Login to heroku and deploy from Repository after creating new app

* Set config vars in settings from .env file

<br>

  

For errors

  

heroku logs --tail

  

To check logs on heroku cli -

  

heroku logs --app appname_on_heroku
