import React from 'react';
import { Form, Input, Icon, Select,Button } from 'antd';
import 'antd/dist/antd.css'
let id = 0;

class DynamicFieldSet extends React.Component {
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        console.log(this.props)
        const { form } = this.props;
        console.log(this.props)
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

  

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        const { Option } = Select;

        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                // label={index === 0 ? ' ' : ''}
                label={index === 0 ? '语言' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onBlur','onChange'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "输入内容不能为空",
                        },
                    ],
                })(
                    <div>
                       
                        <Select  style={{ width: 120,marginRight:10 }} placeholder='语言选择' onChange={handleChange}>
                            <Option value="Chinese">中文</Option>
                            <Option value="English">English</Option>
                        </Select>
                        <Input placeholder="内容" style={{ width: '60%', marginRight: 8 }} />
                        {keys.length > 1 ? (
                            <Icon className="dynamic-delete-button" type="minus-circle-o"
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </div>
                )}

            </Form.Item>
        ));
        return (
            <Form >
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
                        <Icon type="plus" /> 添加多语言
            </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);
export default WrappedDynamicFieldSet;
