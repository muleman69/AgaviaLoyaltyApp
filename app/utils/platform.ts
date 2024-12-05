import { isIOS, isAndroid, Device } from '@nativescript/core';

export const platform = {
    isIOS: isIOS,
    isAndroid: isAndroid,
    deviceType: Device.deviceType,
    osVersion: Device.osVersion,
    sdkVersion: Device.sdkVersion,
    language: Device.language,
    manufacturer: Device.manufacturer,
    model: Device.model,
    uuid: Device.uuid
};