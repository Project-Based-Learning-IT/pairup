# PairUp
**Deployed Frontend on https://appetize.io/app/b5u340q115tqhw165t0cxy9cwm**

**Deployed Backend on http://campusspace.herokuapp.com**

**Sub-project**: https://github.com/Project-Based-Learning-IT/linkedin-scraper

**Database**: https://console.clever-cloud.com/users/me/addons/addon_326ddae1-0de7-44f0-93da-c1eb2eea89c7

## Demo

## Recommendation Algorithm

### Process Flow Diagram
![Diagram](https://github.com/Project-Based-Learning-IT/Recommendation-Algorithm/blob/main/Process%20Flow%20diagram%20for%20ML%20model.png)

### Example prediction
![Diagram of prediction](https://github.com/Project-Based-Learning-IT/Recommendation-Algorithm/blob/main/Top%20prediction.png)

### Setup
<li> Clone the repository using following command or github desktop
<p><code>git clone https://github.com/Project-Based-Learning-IT/CollegeSpace.git</code></p>
</li>

## Frontend

Env Setup and Wireless Connection to JS server using physical android device : https://reactnative.dev/docs/environment-setup
<ol>
<li>
Navigate to the cloned repository
<p><code>cd CollegeSpace</code></p>
<p><code>cd frontend</code></p>
<p><code>yarn install</code></p>
If yarn is not found <code>npm install -g yarn</code>
</li>
<li>
Open a terminal from the current directory i.e. <code>CollegeSpace/frontend</code> and run the following command to start the metro bundler

<p><code>npx react-native start  --reset-cache</code></p>
</li>
<li>

[Android] Let Metro Bundler of previous step run in its own terminal. Open a new terminal inside from the current directory i.e. <code>CollegSpace/frontend</code>. Run the following:

<p><code>npx react-native run-android</code></p>
<p>[Make sure to use<code>yarn install</code> if there are errors]</p>
</li>


### Physical device USB connection
Follow [docs](https://reactnative.dev/docs/running-on-device) and also do adb reverse port 5000 along with 8081 for flask server access

    adb -s <device  name> reverse tcp:8081 tcp:8081
    adb -s <device  name> reverse tcp:5000 tcp:5000

Sidhant's Device:

    adb -s ZF6224Z7QQ reverse tcp:8081 tcp:8081
    adb -s ZF6224Z7QQ reverse tcp:5000 tcp:5000

Can use [SCRCPY](https://github.com/Genymobile/scrcpy) to cast device to PC
### Physical device wireless connection
Note: Flask server isn't connected with this method

To find the devices: `adb devices`
1. Make sure your laptop and your phone are on the  **same**  Wi-Fi network.
2.  Open your React Native app on your device.
3.  You'll see a  [red screen with an error](https://reactnative.dev/docs/debugging#in-app-errors-and-warnings). This is OK. The following steps will fix that.
4.  Open the in-app  [Developer menu]
(https://reactnative.dev/docs/debugging#accessing-the-in-app-developer-menu).
To open the dev menu: `adb shell input keyevent 82`
5.  Go to  **Dev Settings**  →  **Debug server host & port for device**. 
6.  Type in your machine's IP address and the port of the local dev server (e.g. 10.0.1.1:8081).
`ipconfig` to find your machine's IP address
8.  Go back to the  **Developer menu**  and select  **Reload JS**.

### Errors and solutions
<p>Error: mergeLibDexDebug FAILED </p>
<p>Solution: fixed by enabling the multiDex in the </p>

    /android/app/build.gradle file.
    android { 
    defaultConfig { 
    ....... 
    multiDexEnabled true 
    } 
    ......
    }
Network Error of Axios:

Solution:
added these to my `/android/app/src/main/AndroidManifest.xml`
```
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        ...
        android:usesCleartextTraffic="true"  // <-- added this 
        ...>
        ...
    </application>
</manifest>
```

</ol>

### Frontend References

https://reactnative.dev/

https://callstack.github.io/react-native-paper/

https://reactnavigation.org/

https://www.npmjs.com/package/react-native-deck-swiper 

https://www.npmjs.com/package/react-native-flip-card 

https://www.npmjs.com/package/react-native-hyperlink 

https://www.npmjs.com/package/react-native-dotenv

https://www.npmjs.com/package/axios

https://react-native-async-storage.github.io/async-storage/ [Not Working]


## Backend

### Setup Database server
using XAMPP (Apache and MySQL) and make these changes after starting Apache and Mysql(Stop MySQL Workbench service from services to freeup port 3306) in XAMMP->Apache->Config->php.ini
```sql
Find:
post_max_size = 8M
upload_max_filesize = 2M
max_execution_time = 30
max_input_time = 60
memory_limit = 8M

Change to:
post_max_size = 750M
upload_max_filesize = 750M
max_execution_time = 5000
max_input_time = 5000
memory_limit = 1000M
```
Normally Exported sql Script does not have create database syntax. So you should create a database using phpMyAdmin and then import SQL file using phpMyAdmin (XAMMP->MySQL->Admin)

### Setup Server

Navigate to the cloned repository

    cd CollegeSpace
    cd backend

Run the following commands one by one:

    pip install virtualenv
    virtualenv env
    .\env\Scripts\activate.bat [For subsequent runs]

Install requirements if not done already - `pip install -r requirements.txt`  

Main Packages

    pip install flask
    pip install flask-sqlalchemy
    pip install mysqlclient
    pip install bloom-filter2
    pip install pandas
    pip install scikit-learn
    pip install flask-jwt-extended
    pip install python-dotenv
    pip install python-dateutil
    pip install -U flask-cors
    pip install flask-restx

Install a python formatter in VSCode outside of virtual environment

To exit virtual environment use `deactivate`
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
* CORS: https://pypi.org/project/Flask-Cors/
* Swagger UI: https://flask-restx.readthedocs.io/en/latest/index.html 

* To start flask server <br>
`python app.py`

## Backend hosted on Heroku

    pip install gunicorn
    pip freeze > requirements.txt

Inside Procfile:

    web: gunicorn <main_file_name>:<flask_app_name>

* Login to heroku and deploy from Repository after creating new app
* To deploy from subfolder follow https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
* Set config vars in settings from .env file

#### For errors

    heroku logs --tail

To check logs on heroku cli -

    heroku logs --app appname_on_heroku

## Frontend hosted on Appetize
* Build Debug APK using following guide
https://stackoverflow.com/a/56520746/15395433, use `gradlew assembleDebug`
* Upload it on [Appetize](https://appetize.io/)

## Comment Anchors

-   ANCHOR - Used to indicate a section in your file
-   TODO - An item that is awaiting completion
-   FIXME - An item that requires a bugfix
-   STUB - Used for generated default snippets
-   NOTE - An important note for a specific code section
-   REVIEW - An item that requires additional review
-   SECTION - Used to define a region (See 'Hierarchical anchors')
-   LINK - Used to link to a file that can be opened within the editor (See 'Link Anchors')

