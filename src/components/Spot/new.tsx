import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAppState } from "redux/app/selectors";
import { addSpot } from "redux/app/actions";
import { Button, Modal, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface NewSpotProps {
  showModal: boolean;
  hideModal: () => void;
}

const DetailSpot: FC<NewSpotProps> = (props: NewSpotProps) => {
  const { showModal, hideModal } = props;
  
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { TextArea } = Input;
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    const formData: any = new FormData();

    let fileObjList: any = [];

    for (let i = 0; i < fileList.length; i++) {
      fileObjList.push(fileList[i].originFileObj);
    }

    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    
    for (let i = 0 ; i < fileObjList.length ; i++) {
      formData.append("images[]", fileObjList[i]);
    }

    await dispatch(addSpot(formData));

    window.location.href = "/";
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal title="Create Spot" open={showModal} onCancel={hideModal} footer={null}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input title." }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description." }]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price." }]}
        >
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item
          label="Images"
          name="Images"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            multiple={true}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="spot_submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailSpot;
