# PairUp
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

<p><code>npx react-native start --reset-cache</code></p>
</li>
<li>

[Android] Let Metro Bundler of previous step run in its own terminal. Open a new terminal inside from the current directory i.e. <code>CollegSpace/frontend</code>. Run the following:

<p><code>npx react-native run-android</code></p>
<p>[Make sure to use<code>yarn install</code> if there are errors]</p>
</li>

### Physical device wireless connection
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
and localhost (http://127.0.0.1:8000/) is replaced by
your IP address
</ol>

### Frontend References

https://reactnative.dev/

https://callstack.github.io/react-native-paper/

https://reactnavigation.org/

https://www.npmjs.com/package/react-native-deck-swiper 

https://www.npmjs.com/package/react-native-flip-card 

https://www.npmjs.com/package/react-native-hyperlink 

https://www.npmjs.com/package/react-native-dotenv

https://www.npmjs.com/package/react-native-axios


## Backend

Navigate to the cloned repository

    cd CollegeSpace
    cd backend

Run the following commands one by one:

    pip install virtualenv
    virtualenv env
    .\env\Scripts\activate.bat

 (For subsequent run)

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
* https://pypi.org/project/Flask-Cors/

* To start flask server <br>
`python app.py`

### Heroku

    pip install gunicorn
    pip freeze > requirements.txt

Inside Procfile:

    web: gunicorn <main_file_name>:<flask_app_name>

* Login to heroku and deploy from Repository after creating new app
* Set config vars in settings from .env file

#### For errors

    heroku logs --tail

To check logs on heroku cli -

    heroku logs --app appname_on_heroku

## Comment Anchors

-   ANCHOR - Used to indicate a section in your file
-   TODO - An item that is awaiting completion
-   FIXME - An item that requires a bugfix
-   STUB - Used for generated default snippets
-   NOTE - An important note for a specific code section
-   REVIEW - An item that requires additional review
-   SECTION - Used to define a region (See 'Hierarchical anchors')
-   LINK - Used to link to a file that can be opened within the editor (See 'Link Anchors')

