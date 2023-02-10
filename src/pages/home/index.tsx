import React, { useState, useEffect } from "react";
import Container from "components/Container";
import DetailSpot from "components/Spot/detail";
import NewSpot from "components/Spot/new";
import { useSelector, useDispatch } from "react-redux";
import { getAppState } from "redux/app/selectors";
import { getSpots } from "redux/app/actions";
import { Table, Button } from 'antd';

const Home = () => {
  const [showNew, setShowNew] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [spot, setSpot] = useState(null);

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

  const showNewModal = () => {
    setShowNew(true);
  };

  const hideDetailModal = () => {
    setShowDetail(false);
  };

  const hideNewModal = () => {
    setShowNew(false);
  };
  
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
        <Button type="primary" onClick={showNewModal}>
          Create Spot
        </Button>
      </div>

      <NewSpot showModal={showNew} hideModal={hideNewModal} />
      <DetailSpot showModal={showDetail} hideModal={hideDetailModal} spot={spot} />
    </Container>
  );
};

export default Home;
