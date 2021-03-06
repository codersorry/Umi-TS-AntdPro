import { Modal } from 'antd';
import useRequest from '@ahooksjs/use-request';

function useDeleteRows(service: any, option: any) {
    const { current, pageSize, total, formData, fetch } = option;

    const { run } = useRequest(service, {
        manual: true,
    });

    const runFc = (ids: any) => {
        run(ids).then(status => {
            if (status) {
                // 处理当前页所有条数被删除
                let page =
                    current != 1 && ids.length === total - (current - 1) * pageSize
                        ? current - 1
                        : current;
                fetch({ current: page, pageSize }, formData);
            }
        });
    };

    const model = (ids: any) => {
        Modal.confirm({
            title: '是否确认删除？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                runFc(ids);
            },
        });
    };

    return { model, run: runFc };
}

export default useDeleteRows;
