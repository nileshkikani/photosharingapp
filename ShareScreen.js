import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    Image,
    ToolbarAndroid
} from 'react-native';
import ShareExtension from 'react-native-share-extension';
import RNFetchBlob from 'react-native-fetch-blob';
const { width, height } = Dimensions.get('window')
//const { type, value } = await ShareExtension.data();
import { PermissionsAndroid } from 'react-native';

var base64 = require('base-64');
var iSize = null;

var perGranted;

async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            perGranted = true;
        } else {
            perGranted = false;
        }
    } catch (err) {
        console.warn(err)
    }
}

export default class ShareScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true,
            type: 'aaa',
            value: 'aaa',
            imageName: 'aaa',
            imageSize: 'Loading ...'
        }
    }

    componentWillMount() {
        requestCameraPermission();
    }

    async componentDidMount() {
        console.log('This is component did mount :------> ');

        try {
            const { type, value } = await ShareExtension.data()
            console.log('This is component did mount :------> ', type + '---Value----' + value);

            var iName = value.substr((value.lastIndexOf('/') + 1), value.length);
            var base64 = require('base-64');

            RNFetchBlob.fs.readFile(value, 'base64')
                .then((data) => {
                    var decodedData = base64.decode(data);
                    var bytes = decodedData.length;
                    if (bytes < 1024) {
                        console.log(bytes + " Bytes");
                        iSize = bytes + " Bytes";
                    } else if (bytes < 1048576) {
                        console.log("KB:" + (bytes / 1024).toFixed(3) + " KB");
                        iSize = (bytes / 1024).toFixed(3) + " KB";
                    } else if (bytes < 1073741824) {
                        console.log("MB:" + (bytes / 1048576).toFixed(2) + " MB");
                        iSize = (bytes / 1048576).toFixed(2) + " MB";
                    } else {
                        console.log((bytes / 1073741824).toFixed(3) + " GB");
                        iSize = (bytes / 1073741824).toFixed(3) + " GB";
                    }
                    this.setState({
                        imageSize: iSize
                    });
                });

            this.setState({
                type: type,
                value: value,
                imageName: iName,
            });

            console.log('This is component did mount :------> ', this.state.value);
            console.log('This is component did mount :------> ', this.state.imageSize);

        } catch (e) {
            console.log('errrr', e)
        }
    }

    onClose = () => {
        ShareExtension.close()
    }

    closing = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        // return (
        //     <Modal backdrop={false}
        //         onRequestClose={this.onClose}
        //         style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.state.isOpen} onClosed={this.onClose}>
        //         <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        //             <View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', height: 200, width: 300 }}>
        //                 <TouchableOpacity onPress={this.closing}>
        //                     <Text style={{ color: 'black' }}>Close</Text>
        //                     <Text style={{ color: 'black' }}>type: {this.state.type}</Text>
        //                     <Text style={{ color: 'black' }}>value: {this.state.value}</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </Modal>
        // );

        return (
            <View style={styles.mainContainer}>
                <ToolbarAndroid style={styles.toolbarcontainer} contentInsetStart={0}>
                    <View style={styles.actionviewcontainer}>
                        <Text style={styles.actiontitlecontainer}>Display Image</Text>
                    </View>
                </ToolbarAndroid>
                <View style={styles.container}>


                    <Image style={{
                        aspectRatio: 1,
                        alignSelf: 'center',
                        width: (width - 20),
                    }} source={{ uri: this.state.value }} />

                </View>

                <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
                    <Text>File: {this.state.imageName}</Text>
                    <Text>Size: {this.state.imageSize}</Text>
                </View>

                {/* <View style={[styles.container, { flexDirection: 'column' }]}> */}
                {/* <View style={styles.container}><Text>File: </Text> </View>
                <View style={styles.container}> <Text>Size:</Text></View> */}
                {/* </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    toolbarcontainer: {
        height: 35,
        backgroundColor: '#3476BE',
    },
    actionviewcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    actiontitlecontainer: {
        color: 'white',
    },
});
