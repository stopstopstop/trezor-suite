import React from 'react';
import styled from 'styled-components';

import { variables, Icon, Button, useTheme } from '@trezor/components';
import { DeviceAnimation } from '@onboarding-components';
import { Translation } from '@suite-components';
import { useDevice, useActions } from '@suite-hooks';
import * as routerActions from '@suite-actions/routerActions';
import type { PrerequisiteType } from '@suite-types';
import { motion } from 'framer-motion';
import { enterEase } from '@suite-config/animation';

const Wrapper = styled(motion.div)`
    display: flex;
    height: 122px;
    min-height: 122px;
    width: 360px;
    border-radius: 61px;
    padding: 10px;
    background: ${props => props.theme.BG_WHITE};
    align-items: center;
    box-shadow: 0 2px 5px 0 ${props => props.theme.BOX_SHADOW_BLACK_20};
    margin-bottom: 60px;
`;

const ImageWrapper = styled.div`
    display: flex;
    position: relative;
`;
const Checkmark = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 32px;
    text-align: center;
    color: ${props => props.theme.TYPE_DARK_GREY};
    font-size: 20px;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};

    button {
        margin-top: 10px;
    }
`;

interface Props {
    connected: boolean;
    showWarning: boolean;
    allowSwitchDevice?: boolean;
    prerequisite?: PrerequisiteType;
}

const getMessageId = ({
    connected,
    showWarning,
    prerequisite,
}: {
    connected: boolean;
    showWarning: boolean;
    prerequisite?: PrerequisiteType;
}) => {
    switch (prerequisite) {
        case 'transport-bridge':
            return 'TR_TREZOR_BRIDGE_IS_NOT_RUNNING';
        case 'device-bootloader':
            return 'TR_DEVICE_CONNECTED_BOOTLOADER';
        default: {
            if (connected) {
                return !showWarning ? 'TR_DEVICE_CONNECTED' : 'TR_DEVICE_CONNECTED_WRONG_STATE';
            }
            return 'TR_CONNECT_YOUR_DEVICE';
        }
    }
};
const ConnectDevicePrompt = ({
    prerequisite,
    connected,
    showWarning,
    allowSwitchDevice,
}: Props) => {
    const theme = useTheme();
    const { device } = useDevice();
    const { goto } = useActions({
        goto: routerActions.goto,
    });

    return (
        <Wrapper
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: enterEase }}
            data-test="@connect-device-prompt"
        >
            <ImageWrapper>
                <DeviceAnimation
                    type="CONNECT"
                    device={device}
                    loop={!connected}
                    shape="CIRCLE"
                    size={100}
                />
                <Checkmark>
                    {connected && !showWarning && (
                        <Icon icon="CHECK_ACTIVE" size={24} color={theme.TYPE_GREEN} />
                    )}
                    {showWarning && (
                        <Icon icon="WARNING_ACTIVE" size={24} color={theme.TYPE_ORANGE} />
                    )}
                </Checkmark>
            </ImageWrapper>
            <Text>
                <Translation id={getMessageId({ connected, showWarning, prerequisite })} />
                {allowSwitchDevice && (
                    <Button
                        variant="tertiary"
                        onClick={() =>
                            goto('suite-switch-device', { params: { cancelable: true } })
                        }
                    >
                        <Translation id="TR_SWITCH_DEVICE" />
                    </Button>
                )}
            </Text>
        </Wrapper>
    );
};

export default ConnectDevicePrompt;
