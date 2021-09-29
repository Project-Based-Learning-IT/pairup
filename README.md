

# CollegeSpace

<li>
Clone the repository using following command or github desktop
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
[Optional]
Open a terminal from the current directory i.e. <code>CollegSpace/frontend</code> and run the following command to start the metro bundler
<p><code>npx react-native start</code></p>
</li>
<li>
[Android] Let Metro Bundler of previous step run in its own terminal. Open a new terminal inside from the current directory i.e. <code>CollegSpace/frontend</code>. Run the following:
<p><code>npx react-native run-android</code></p>
</li>
</ol>


## Backend

Navigate to the cloned repository

	cd CollegeSpace
	cd backend
Run the following commands one by one: 

    pip install virtualenv
	virtualenv env 
	 .\env\Scripts\activate.bat
Install requirements if not done already

    pip install flask
    pip install flask-sqlalchemy
    pip install mysqlclient
    pip install bloom-filter2
    [Model training packages]
 Install a python formatter in VSCode outside of virtual environment
 <br>
 To exit virtual environment use `deactivate`
 <br>
 Formatter - 
 1. Open pyton file and press `ctrl+shift+p` to bring up command pallet and search format format
 2. Click format document with and install python formatter when prompted by Vscode
 3. Repeat step 1 and choose default formatter to installed one
4.  Also turn on format on save from VScode settings

    
* Use SQLALCHEMY_DATABASE_URI of clever cloud after login.
* Manage Tables, database using inbuilt phpMyAdmin of Clevercloud
https://console.clever-cloud.com/
Same email and password
* Documentation Flask : https://flask.palletsprojects.com/en/2.0.x/
* Documentation SQLAlchemy: https://flask-sqlalchemy.palletsprojects.com/en/2.x/
* To start flask server <br>
`python app.py`

### Heroku

    pip install gunicorn
    pip freeze > requirements.txt
Inside Procfile:

    web: gunicorn <main_file_name>:<flask_app_name>

* Login to heroku and deploy from Repository after creating new app
<br>

For errors

    heroku logs --tail

To check logs on heroku cli - 

    heroku logs --app appname_on_heroku

