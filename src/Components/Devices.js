import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import React from 'react';
import DeviceList from './DeviceList';
import DisplayTypeButtons from './DisplayTypeButtons';
import InfoIcon from '@material-ui/icons/Info';
import CallToActionIcon from '@material-ui/icons/CallToAction';

class Devices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: this.props.deviceManager.getDevices(),
            displayMode: this.props.appConfig.getAppConfig('device_view_mode') || "Table_Status",
        }
    }

    buttons = [{
        toolTip: "Details",
        label: "details",
        icon: <InfoIcon />,
        onButtonClick: (mac, event) => this.openDeviceDetails(mac, event),
    }, {
        toolTip: "Settings",
        label: "settings",
        icon: <SettingsApplicationsIcon />,
        onButtonClick: (mac, event) => this.openDeviceSettings(mac, event),
    }, {
        toolTip: "Console",
        label: "console",
        icon: <CallToActionIcon />,
        onButtonClick: (mac, event) => this.openDeviceConsole(mac, event),
    }, {
        toolTip: "Delete",
        label: "delete",
        icon: <DeleteIcon />,
        onButtonClick: (mac, event) => this.deleteDevice(mac, event),
    }]

    openDeviceDetails = (macAddress, event) => {
        event.stopPropagation();
        this.props.history.push('/details/' + macAddress);
    }

    openDeviceSettings = (macAddress, event) => {
        event.stopPropagation();
        this.props.history.push('/settings/' + macAddress);
    }

    openDeviceConsole = (macAddress, event) => {
        event.stopPropagation();
        this.props.history.push('/console/' + macAddress);
    }

    deleteDevice = (macAddress, event) => {
        event.stopPropagation();
        this.props.deviceManager.removeDevice(macAddress);
        const newDevices = this.props.deviceManager.getDevices();
        this.setState({
            devices: newDevices
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.displayMode !== this.state.displayMode) {
            this.props.appConfig.putAppConfig('device_view_mode', this.state.displayMode)
        }
    }

    render() {

        return (
            <Box display="flex" flexGrow={1} flexDirection="column" style={{ overflow: "visible", position: "absolute" }}>
                <Box display="flex" flexDirection="row" alignItems="baseline">
                    <h1>Devices</h1>
                    <DisplayTypeButtons displayMode={this.state.displayMode} setState={(state) => this.setState(state)} />
                </Box>
                <DeviceList
                    displayMode={this.state.displayMode}
                    deviceSections={{ "": { devices: this.state.devices, itemButtons: this.buttons } }}
                    deviceManager={this.props.deviceManager}
                />

            </Box>
        );
    }
}
export default Devices