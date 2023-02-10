import React, { useState, useEffect } from "react";
import Container from "components/Container";
import DetailSpot from "components/Detail";
import { useSelector, useDispatch } from "react-redux";
import { getAppState } from "redux/app/selectors";
import { getSpots, addSpot } from "redux/app/actions";
import { Table, Button, Modal, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [spot, setSpot] = useState(null);

  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { spots } = useSelector(
    getAppState
  );

  useEffect(() => {
    dispatch(getSpots());
  }, []);

  const handleRowClick = (record: any) => {
    setShowDetail(true);
    setSpot(record);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const hideDetailModal = () => {
    setShowDetail(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Main Image',
      dataIndex: 'images',
      key: 'images',
      render: (images: any) => images.length ? <img src={images[0]} className="spot_image" /> : <></>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      key: 'reviews',
      render: (reviews: any) => <div>{reviews.length}</div>
    }
  ];

  return (
    <Container>
      <div id="welcome" className="homeContainer">
        <h2>Spots List</h2>
        <Table
          dataSource={spots}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { handleRowClick(record) },
            };
          }}
        />
        <Button type="primary" onClick={showModal}>
          Create Spot
        </Button>
        <Modal title="Create Spot" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
      </div>

      <DetailSpot showModal={showDetail} hideModal={hideDetailModal} spot={spot} />
    </Container>
  );
};

export default Home;
