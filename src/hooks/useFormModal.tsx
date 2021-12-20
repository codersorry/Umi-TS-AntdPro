import { useState, useEffect } from 'react';
import useRequest from '@ahooksjs/use-request';

function useOnOk(service: any) {
    const { run, loading } = useRequest(service, { manual: true });
    return {
        loading,
        onOk: (fieldsValue: any) => run(fieldsValue),
    };
}

function useFormModal({ modal, service, defaultFormData, confirm, ...rest }: any) {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
        setFormData(defaultFormData || {});
    }, [defaultFormData]);

    const { onCancel, ...restModalProps } = modal;
    const { onOk, loading } = useOnOk(service);
    const modalProps = {
        visible,
        onCancel() {
            setVisible(false);
            onCancel && onCancel();
        },
        confirmLoading: loading,
        ...restModalProps,
    };

    return { modalProps, setVisible, formData, setFormData, confirm: confirm || onOk, ...rest };
}

export default useFormModal;
