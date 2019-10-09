# Fast Prototyping

## Summary
Fast Prototyping is a 2 part demo consisting of speech and structured data.

## Motivation
This web application was developed to enable evaluations of novel language technologies for improving workflow efficiencies in a hospital telehealth setting.

## Framework Used
The web application was built with React and Flask. 

React is a JavaScript library for building user interfaces that is maintained by Facebook and a community of individual developers and companies. 

Flask is a micro web framework written in Python that does not require particular tools or libraries.

The design of the web application was made possible with Ant Design, a React UI library that contains a set of high-quality components and demos for building rich, interactive user interfaces.

## Usage of Entire Application
The web application should be launched at [localhost:3000](/) by default.

Sample codes which are commonly used can be found at 
~~~~{.javascript}
sampleCodes.js
~~~~
and
~~~~{.python}
sampleCodes.py
~~~~

## Speech Data Component
The following instructions are for the speech data component.

### Features
* Allow users to enter dialogue / transcription of audio files in text format
* Dialogue / transcription will be processed using LSTM model 
* Results of LSTM model will be displayed as a table
* Users can clear dialogue / transcription if needed
* Loading animation shown while waiting for processing to be done
* Allow users to play audio files from a dropdown list
* Allow users to search for a specific word and display the sentence in which the word appears in

### Installation
Before downloading or installing anything, first install
1. [Node (>=6)](https://nodejs.org/en/download/)
2. [npm (>=5.2)](https://www.npmjs.com/get-npm) or [Yarn (>=1.17.3)](https://yarnpkg.com/lang/en/docs/install/) 

Then, download the following libraries:
1. [Ant Design](https://ant.design/docs/react/use-with-create-react-app)
```bash
npm install antd
```
or
```bash
yarn add antd
```

2. [React Audio Player](https://www.npmjs.com/package/react-audio-player)
```bash
npm install --save react-audio-player
```

3. [Axios](https://www.npmjs.com/package/axios)
```bash
npm install axios
```
or
```bash
yarn add axios
```

4. [React Hot Loader](https://www.npmjs.com/package/react-hot-loader)
```bash
npm install react-hot-loader
```

5. [React Firebase](https://www.npmjs.com/package/firebase)
```bash
npm i firebase
```

6. [React Firebase File Uploader](https://www.npmjs.com/package/react-firebase-file-uploader)
```bash
npm i react-firebase-file-uploader
```

7. [BizCharts](https://bizcharts.net)
```bash
npm install bizcharts --save
```

8. [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
```bash
pip install -U flask-cors
```

9. [Pyrebase](https://pypi.org/project/Pyrebase/)
```bash
pip install Pyrebase
```

10. [Firebase](https://pypi.org/project/firebase/)
```bash
pip install firebase
```

Then clone or download this repository above.

### Usage
To run React front-end, run the following line in Command Prompt:
```bash
yarn start
```

To run Flask back-end, run the following lines in Command Prompt:
```bash
cd src
python speechData.py
```

## Structured Data Component
The following instructions are for the structured data component.

### Features
* Allow users to enter structured data into 2 dataframes
* Dataframes will be processed by model
* Results of model will be displayed as a table of risk levels
* Users can clear data entered if needed
* Loading animation shown while waiting for processing to be done
* Allow users to upload files from local directory
* File properties will be displayed
* Highlight most important column based on a dataframe returned by the backend

### Installation
Before downloading or installing anything, first install
1. [Node (>=6)](https://nodejs.org/en/download/)
2. [npm (>=5.2)](https://www.npmjs.com/get-npm) or [Yarn (>=1.17.3)](https://yarnpkg.com/lang/en/docs/install/) 

Then, download the following libraries:
1. [Ant Design](https://ant.design/docs/react/use-with-create-react-app)
```bash
npm install antd
```
or
```bash
yarn add antd
```

2. [Axios](https://www.npmjs.com/package/axios)
```bash
npm install axios
```
or
```bash
yarn add axios
```

3. [React Firebase](https://www.npmjs.com/package/firebase)
```bash
npm i firebase
```

4. [React Firebase File Uploader](https://www.npmjs.com/package/react-firebase-file-uploader)
```bash
npm i react-firebase-file-uploader
```

5. [BizCharts](https://bizcharts.net)
```bash
npm install bizcharts --save
```

6. [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
```bash
pip install -U flask-cors
```

7. [Pyrebase](https://pypi.org/project/Pyrebase/)
```bash
pip install Pyrebase
```

8. [Firebase](https://pypi.org/project/firebase/)
```bash
pip install firebase
```

Then clone or download this repository above.

### Usage
To run React front-end, run the following line in Command Prompt:
```bash
yarn start
```

To run Flask back-end, run the following lines in Command Prompt:
```bash
cd src
python structuredData.py
```
The code for the model can be added in 
~~~~{.python}
def generate_result_from_model()
~~~~
in structuredData.py

## Troubleshooting
For any enquiries, you can email me at [kellie.sim.0101@gmail.com](mailto:kellie.sim.0101@gmail.com).

## Credits
© Kellie Sim 2019
