import React from 'react';
import axios from 'axios';
import './StructuredData.css';
import {
  Icon,
  Input,
  Button,
  Alert,
  Spin,
  Row,
  Col,
  Popconfirm,
  Form,
} from 'antd';
import {TableComponent} from './RiskTable.js';
import {FancyBorder} from './FancyBorder.js';
import {TextFormat} from './TextFormat.js';
import {RiskChart} from './RiskChart.js';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

let FLASK_URL = 'http://127.0.0.1:5000';

const InputGroup = Input.Group;

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      showTable: false,
      riskArray1: [],
      riskArray2: [],
      inputArray: [],
      inputArr: [],
      isLoading: false,
      btnDisabled: false,
      df1r1c1: '',
      df1r1c2: '',
      df1r1c3: '',
      df1r1c4: '',
      df1r2c1: '',
      df1r2c2: '',
      df1r2c3: '',
      df1r2c4: '',
      df1r3c1: '',
      df1r3c2: '',
      df1r3c3: '',
      df1r3c4: '',
      df1r4c1: '',
      df1r4c2: '',
      df1r4c3: '',
      df1r4c4: '',
      df1Arr: [],
      df1r1Arr: [],
      df1r2Arr: [],
      df1r3Arr: [],
      df1r4Arr: [],
      df2r1c1: '',
      df2r1c2: '',
      df2r1c3: '',
      df2r1c4: '',
      df2r2c1: '',
      df2r2c2: '',
      df2r2c3: '',
      df2r2c4: '',
      df2r3c1: '',
      df2r3c2: '',
      df2r3c3: '',
      df2r3c4: '',
      df2r4c1: '',
      df2r4c2: '',
      df2r4c3: '',
      df2r4c4: '',
      df2Arr: [],
      df2r1Arr: [],
      df2r2Arr: [],
      df2r3Arr: [],
      df2r4Arr: [],
      file: '',
      fileArr: [],
      isUploading: false,
      progress: 0,
      fileURL: '',
      fileDir: '',
      featureArray: [],
      maxImptReturned: false,
      maxImptLoc: '',
    };
  }
  render () {
    let LoadingResults,
      UploadResults,
      InputTableVisibility,
      RiskTableVisibility,
      RiskChartVisibility,
      FeatureArrayVisibility,
      HighlightMax;
    const showTable = this.state.showTable; // true only after flask returns value upon being called
    const isLoading = this.state.isLoading;
    const progress = this.state.progress;
    const maxImptReturned = this.state.maxImptReturned;
    const maxImptLoc = this.state.maxImptLoc;

    if (showTable === true) {
      RiskTableVisibility = (
        <FancyBorder color="white">
          <Row>
            <TextFormat header3="Risk Table" />
            <TableComponent riskArray={this.state.riskArray1} />
          </Row>
        </FancyBorder>
      );
      RiskChartVisibility = (
        <FancyBorder color="white">
          <Row>
            <TextFormat header3="Risk Chart" />
            <RiskChart riskArray={this.state.riskArray1} />
          </Row>
        </FancyBorder>
      );
    } else {
      if (isLoading === true) {
        LoadingResults = (
          <FancyBorder color="white">
            <div>
              <Spin
                indicator={<Icon type="loading" style={{fontSize: 40}} spin />}
              >
                <Alert
                  message="Response is loading..."
                  description="Please wait for around 5 seconds to load full results"
                  type="info"
                />
              </Spin>
            </div>
          </FancyBorder>
        );
      }
    }
    if (progress === 100) {
      let fileStr = `Most Recent File Uploaded:  ${this.state.file}`;
      let fileDirStr = `Directory of Most Recent File Uploaded:  ${this.state.fileDir}`;
      let fileArr = `Names of All Uploaded Files: ${this.state.fileArr}`;
      UploadResults = (
        <FancyBorder color="white">
          <div>
            <TextFormat header3="Properties of File(s)" />
            <TextFormat normalText={fileStr} />
            <TextFormat normalText={fileDirStr} />
            <TextFormat normalText={fileArr} />
          </div>
        </FancyBorder>
      );
    }
    if (maxImptReturned === true) {
      console.log (maxImptLoc);
      // for this demo, the feature importance only works for dataframe 1. to use it on
      // dataframe 2, you would probably have to edit the col span accordingly
      if (maxImptLoc === 'col1') {
        FeatureArrayVisibility = (
          <FancyBorder color="specialwhite">
            <Row type="flex">
              <Col span={1}/>
              <Col span={2}>
                <div className="highlightBox">
                  <p>Most Important Feature: {maxImptLoc}</p>
                </div>
              </Col>
            </Row>
          </FancyBorder>
        );
      } else if (maxImptLoc === 'col2') {
        FeatureArrayVisibility = (
          <FancyBorder color="specialwhite">
            <Row type="flex">
              <Col span={3} />
              <Col span={2}>
                <div className="highlightBox">
                  <p>Most Important Feature: {maxImptLoc}</p>
                </div>
              </Col>
            </Row>
          </FancyBorder>
        );
      } else if (maxImptLoc === 'col3') {
        FeatureArrayVisibility = (
          <FancyBorder color="specialwhite">
            <Row type="flex">
              <Col span={6} />
              <Col span={2}>
                <div className="highlightBox">
                  <p>Most Important Feature: {maxImptLoc}</p>
                </div>
              </Col>
            </Row>
          </FancyBorder>
        );
      } else if (maxImptLoc === 'col4') {
        FeatureArrayVisibility = (
          <FancyBorder color="specialwhite">
            <Row type="flex">
              <Col span={8} />
              <Col span={2}>
                <div className="highlightBox">
                  <p>Most Important Feature: {maxImptLoc}</p>
                </div>
              </Col>
            </Row>
          </FancyBorder>
        );
      }
    }

    return (
      <div className="grid-container">
        <div className="topHeader">
          <FancyBorder color="white">
            <TextFormat header2="Structured Data" />
          </FancyBorder>
        </div>
        <br /><br />
        <div className="timeSeriesInput1">
          <FancyBorder color="white">
            <Row type="flex"> <TextFormat header3="Dataframe 1" /> </Row>
            <p />
            <Row type="flex">
              <Col span={1}>t1</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df1r1c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r1c1}
                  />
                  <Input
                    name="df1r1c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r1c2}
                  />
                  <Input
                    name="df1r1c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r1c3}
                  />
                  <Input
                    name="df1r1c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r1c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
            <Row type="flex">
              <Col span={1}>t2</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df1r2c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r2c1}
                  />
                  <Input
                    name="df1r2c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r2c2}
                  />
                  <Input
                    name="df1r2c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r2c3}
                  />
                  <Input
                    name="df1r2c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r2c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
            <Row type="flex">
              <Col span={1}>t3</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df1r3c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r3c1}
                  />
                  <Input
                    name="df1r3c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r3c2}
                  />
                  <Input
                    name="df1r3c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r3c3}
                  />
                  <Input
                    name="df1r3c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r3c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
            <Row type="flex">
              <Col span={1}>t4</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df1r4c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r4c1}
                  />
                  <Input
                    name="df1r4c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r4c2}
                  />
                  <Input
                    name="df1r4c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r4c3}
                  />
                  <Input
                    name="df1r4c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df1r4c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
          </FancyBorder>
        </div>
        <br /><br />
        <div className="timeSeriesInput2">
          <FancyBorder color="white">
            <Row type="flex"> <TextFormat header3="Dataframe 2" /> </Row>
            <p />
            <Row type="flex">
              <Col span={1}>t1</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df2r1c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r1c1}
                  />
                  <Input
                    name="df2r1c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r1c2}
                  />
                  <Input
                    name="df2r1c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r1c3}
                  />
                  <Input
                    name="df2r1c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r1c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
            <Row type="flex">
              <Col span={1}>t2</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df2r2c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r2c1}
                  />
                  <Input
                    name="df2r2c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r2c2}
                  />
                  <Input
                    name="df2r2c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r2c3}
                  />
                  <Input
                    name="df2r2c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r2c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
            <Row type="flex">
              <Col span={1}>t3</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df2r3c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r3c1}
                  />
                  <Input
                    name="df2r3c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r3c2}
                  />
                  <Input
                    name="df2r3c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r3c3}
                  />
                  <Input
                    name="df2r3c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r3c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
            <Row type="flex">
              <Col span={1}>t4</Col>
              <Col span={20}>
                <InputGroup>
                  <Input
                    name="df2r4c1"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r4c1}
                  />
                  <Input
                    name="df2r4c2"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r4c2}
                  />
                  <Input
                    name="df2r4c3"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r4c3}
                  />
                  <Input
                    name="df2r4c4"
                    style={{width: '25%'}}
                    onChange={this.handleChange}
                    value={this.state.df2r4c4}
                  />
                </InputGroup>
              </Col>
              <Col span={3} />
            </Row>
          </FancyBorder>
        </div>
        <br /><br />
        <div className="featureImportance">
          <FancyBorder color="white">
            {FeatureArrayVisibility}
          </FancyBorder>
        </div>
        <br /><br />
        <div className="callFlask">
          <FancyBorder color="white">
            <p />
            <Row type="flex">
              <Col span={3}>
                <Button
                  type="primary"
                  icon="cloud-upload"
                  onClick={this.handleSubmit}
                  disabled={this.state.btnDisabled}
                >
                  Submit
                </Button>
              </Col>
              <Col span={3}>
                <Popconfirm
                  title="Are you sure you want to clear all data entered?"
                  onConfirm={this.handleClear}
                  icon={
                    <Icon
                      type="exclamation-circle"
                      theme="filled"
                      style={{color: 'red'}}
                    />
                  }
                >
                  <Button type="danger" icon="delete">
                    Clear
                  </Button>
                </Popconfirm>
              </Col>
              <Col span={3}>
                <Button type="default" onClick={this.handleFeature}>
                  Show Feature Importance
                </Button>
              </Col>
            </Row>
            <br /><br />
            <Row type="flex">
              <Col span={3}>
                <Form>
                  <label
                    style={{
                      pointer: 'cursor',
                      borderWidth: 'medium',
                      borderStyle: 'solid',
                      borderRadius: '2px',
                      fontSize: '105%',
                    }}
                  >
                    <Icon type="upload" /> Choose File
                    <FileUploader
                      hidden
                      accept="csv/*"
                      name="file"
                      storageRef={firebase.storage ().ref ('uploads')}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                    />
                  </label>
                </Form>
              </Col>
            </Row>
          </FancyBorder>
        </div>
        <br /><br />
        <div className="uploadResult">{UploadResults}</div>
        <br /><br />
        <div className="loading">{LoadingResults}</div>
        <br /><br />
        <div className="riskTable">
          {RiskTableVisibility}
        </div>
        <br /><br />
        <div className="riskChart">
          {RiskChartVisibility}
        </div>
        <div className="credits">
          <FancyBorder color="white">
            <TextFormat credits="© Kellie Sim 2019 | Made with React and Flask" />
          </FancyBorder>
        </div>
      </div>
    );
  }

  // handle change in textarea and state
  handleChange = ({target}) => {
    this.setState (
      {
        [target.name]: target.value,
      },
      () => this.logFields ()
    );
  };

  // print/log textarea value after setting state
  logFields = () => {
    const {
      df1r1c1,
      df1r1c2,
      df1r1c3,
      df1r1c4,
      df1r2c1,
      df1r2c2,
      df1r2c3,
      df1r2c4,
      df1r3c1,
      df1r3c2,
      df1r3c3,
      df1r3c4,
      df1r4c1,
      df1r4c2,
      df1r4c3,
      df1r4c4,
    } = this.state;
    console.log ('Row 1: ', `${df1r1c1} ${df1r1c2} ${df1r1c3} ${df1r1c4}`);
    console.log ('Row 2: ', `${df1r2c1} ${df1r2c2} ${df1r2c3} ${df1r2c4}`);
    console.log ('Row 3: ', `${df1r3c1} ${df1r3c2} ${df1r3c3} ${df1r3c4}`);
    console.log ('Row 4: ', `${df1r4c1} ${df1r4c2} ${df1r4c3} ${df1r4c4}`);
  };

  // handle button + call flask
  handleSubmit = () => {
    this.handleFlask ();
    this.setState ({isLoading: true});
    this.setState ({btnDisabled: true});
    var millisecondsToWait = 3000;
    setTimeout (() => {
      // Whatever you want to do after the wait
      this.setState ({showTable: true});
    }, millisecondsToWait);
  };

  // clear data button
  handleClear = () => {
    this.setState ({
      df1r1Arr: [],
      df1r2Arr: [],
      df1r3Arr: [],
      df1r4Arr: [],
      df1Arr: [],
      isLoading: false,
      showTable: false,
      btnDisabled: false,
      df1r1c1: '',
      df1r1c2: '',
      df1r1c3: '',
      df1r1c4: '',
      df1r2c1: '',
      df1r2c2: '',
      df1r2c3: '',
      df1r2c4: '',
      df1r3c1: '',
      df1r3c2: '',
      df1r3c3: '',
      df1r3c4: '',
      df1r4c1: '',
      df1r4c2: '',
      df1r4c3: '',
      df1r4c4: '',
      df2r1c1: '',
      df2r1c2: '',
      df2r1c3: '',
      df2r1c4: '',
      df2r2c1: '',
      df2r2c2: '',
      df2r2c3: '',
      df2r2c4: '',
      df2r3c1: '',
      df2r3c2: '',
      df2r3c3: '',
      df2r3c4: '',
      df2r4c1: '',
      df2r4c2: '',
      df2r4c3: '',
      df2r4c4: '',
      df2Arr: [],
      df2r1Arr: [],
      df2r2Arr: [],
      df2r3Arr: [],
      df2r4Arr: [],
    });
  };

  // handle Flask post and get
  handleFlask = () => {
    const {
      df1r1c1,
      df1r1c2,
      df1r1c3,
      df1r1c4,
      df1r2c1,
      df1r2c2,
      df1r2c3,
      df1r2c4,
      df1r3c1,
      df1r3c2,
      df1r3c3,
      df1r3c4,
      df1r4c1,
      df1r4c2,
      df1r4c3,
      df1r4c4,
      df1Arr,
      df1r1Arr,
      df1r2Arr,
      df1r3Arr,
      df1r4Arr,
      df2r1c1,
      df2r1c2,
      df2r1c3,
      df2r1c4,
      df2r2c1,
      df2r2c2,
      df2r2c3,
      df2r2c4,
      df2r3c1,
      df2r3c2,
      df2r3c3,
      df2r3c4,
      df2r4c1,
      df2r4c2,
      df2r4c3,
      df2r4c4,
      df2Arr,
      df2r1Arr,
      df2r2Arr,
      df2r3Arr,
      df2r4Arr,
      inputArr,
    } = this.state;
    df1r1Arr.push (df1r1c1, df1r1c2, df1r1c3, df1r1c4);
    df1r2Arr.push (df1r2c1, df1r2c2, df1r2c3, df1r2c4);
    df1r3Arr.push (df1r3c1, df1r3c2, df1r3c3, df1r3c4);
    df1r4Arr.push (df1r4c1, df1r4c2, df1r4c3, df1r4c4);
    df1Arr.push (df1r1Arr, df1r2Arr, df1r3Arr, df1r4Arr);
    this.setState ({df1Arr: df1Arr});
    this.setState ({df1r1Arr: df1r1Arr});
    this.setState ({df1r2Arr: df1r2Arr});
    this.setState ({df1r3Arr: df1r3Arr});
    this.setState ({df1r4Arr: df1r4Arr});
    df2r1Arr.push (df2r1c1, df2r1c2, df2r1c3, df2r1c4);
    df2r2Arr.push (df2r2c1, df2r2c2, df2r2c3, df2r2c4);
    df2r3Arr.push (df2r3c1, df2r3c2, df2r3c3, df2r3c4);
    df2r4Arr.push (df2r4c1, df2r4c2, df2r4c3, df2r4c4);
    df2Arr.push (df2r1Arr, df2r2Arr, df2r3Arr, df2r4Arr);
    this.setState ({df2Arr: df2Arr});
    this.setState ({df2r1Arr: df2r1Arr});
    this.setState ({df2r2Arr: df2r2Arr});
    this.setState ({df2r3Arr: df2r3Arr});
    this.setState ({df2r4Arr: df2r4Arr});
    console.log (df1Arr, df2Arr);
    inputArr.push (df1Arr, df2Arr);
    this.setState ({inputArr: inputArr});

    let riskArray1 = [], riskArray2 = [], inputArray = [], randomArray = [];
    axios
      .post (FLASK_URL + '/postToFlask', {inputArray: inputArr})
      .then (function (response) {
        console.log ('/postToFlask Returns: ' + JSON.stringify (response.data));
        console.log (response.data);
        axios
          .get (FLASK_URL + '/getInputTable')
          .then (function (response) {
            console.log (
              '/getInputTable Returns: ' + JSON.stringify (response.data)
            );
            let responseArr = response.data;
            responseArr.map (_item => {
              inputArray.push (_item);
            });
            console.log (inputArray);
            axios
              .get (FLASK_URL + '/getResponse')
              .then (function (response) {
                console.log (
                  '/getResponse Returns: ' + JSON.stringify (response.data)
                );
                let responseArr = response.data;
                let responseArr1 = responseArr.slice (0, 1);
                let responseArr2 = responseArr.slice (1, 2);
                console.log (responseArr1);
                responseArr1.map (_item => {
                  randomArray = responseArr1[0];
                  randomArray.map (_item => {
                    riskArray1.push (_item);
                    console.log (riskArray1);
                  });
                });
                responseArr2.map (_item => {
                  randomArray = responseArr2[0];
                  randomArray.map (_item => {
                    riskArray2.push (_item);
                    console.log (riskArray2);
                  });
                });
              })
              .catch (function (error) {
                console.log ('/getResponse Returns: ' + error);
              });
            return riskArray1;
          })
          .catch (function (error) {
            console.log ('/getInputTable Returns: ' + error);
          });
      })
      .catch (function (error) {
        console.log ('/postToFlask Returns: ' + error);
      });

    this.setState ({inputArray: inputArray});
    this.setState ({riskArray1: riskArray1});
    this.setState ({riskArray2: riskArray2});
  };

  handleUploadStart = () => {
    this.setState ({isUploading: true, progress: 0});
    console.log (this.state.isUploading);
  };

  handleProgress = progress => {
    this.setState ({progress});
    console.log (this.state.isUploading, this.state.progress);
  };

  handleUploadError = error => {
    console.log (this.state.isUploading);
    this.setState ({isUploading: false});
    console.error (error);
  };

  handleUploadSuccess = filename => {
    let fileDir;
    const fileArr = this.state.fileArr.concat (filename);
    // fileArr.push (filename);
    console.log (this.state.isUploading);
    this.setState ({
      file: filename,
      progress: 100,
      isUploading: false,
      fileArr: fileArr,
    });
    console.log (this.state.isUploading);
    console.log (fileArr);
    firebase
      .storage ()
      .ref ('uploads')
      .child (filename)
      .getDownloadURL ()
      .then (url => this.setState ({fileURL: url}));
    console.log (this.state.fileURL);
    axios
      .post (FLASK_URL + '/uploadFiles', {filename: filename})
      .then (function (response) {
        console.log ('/uploadFiles Returns: ' + JSON.stringify (response.data));
        fileDir = response.data;
        console.log (fileDir);
      })
      .catch (function (error) {
        console.log ('/uploadFiles Returns: ' + error);
      });
    var millisecondsToWait = 1000;
    setTimeout (() => {
      // Whatever you want to do after the wait
      console.log (fileDir);
      console.log (fileArr);
      this.setState ({fileDir: fileDir});
    }, millisecondsToWait);
  };

  // calls model for feature importance
  handleFeature = () => {
    let featureArray = [], maxImpt = 0, maxImptLoc = '', obj = {};
    axios
      .post (FLASK_URL + '/featureImportance')
      .then (function (response) {
        console.log (
          '/featureImportance Returns: ' + JSON.stringify (response.data)
        );
        let responseArr = response.data;
        console.log (responseArr);
        responseArr.map (_item => {
          featureArray.push (_item);
          console.log (featureArray);
          maxImpt = Math.max.apply (
            Math,
            featureArray.map (function (o) {
              return o.importanceLvl;
            })
          );
          console.log (maxImpt);
          obj = featureArray.find (function (o) {
            return o.importanceLvl === maxImpt;
          });
          console.log (obj);
          // the maxImptLoc is based on the values returned in structuredData.py,
          // for this demo a dictionary with 4 cols and 4 values are returned
          maxImptLoc = obj.colNo;
          console.log (maxImptLoc);
        });
      })
      .catch (function (error) {
        console.log ('/featureImportance Returns: ' + error);
      });
    var millisecondsToWait = 3000;
    setTimeout (() => {
      // whatever you want to do after the wait
      this.setState ({featureArray: featureArray});
      this.setState ({maxImptLoc: maxImptLoc});
      this.setState ({maxImptReturned: true});
    }, millisecondsToWait);
  };
}

export default App;
