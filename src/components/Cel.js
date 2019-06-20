import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const Cel = (props) => ( 
        <TouchableOpacity
        onPress={props.onPress}
        style={props.styleCel}
        >
            <Image source={require('../img/peso.png')} style={props.styleIcon}/>
        </TouchableOpacity>

    )

export default Cel;