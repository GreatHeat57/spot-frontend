import React, { FC } from 'react';
import { Modal } from 'antd';

interface DetailSpotProps {
  spot: any;
  showModal: boolean;
  hideModal: () => void;
}

const DetailSpot: FC<DetailSpotProps> = (props: DetailSpotProps) => {
  const { spot, showModal, hideModal } = props;

  return (
    <Modal title="Spot Detail" open={showModal} onOk={hideModal} onCancel={hideModal} width={'75%'}>
      <div className='title'>Title: {spot && spot.title}</div>
      <div className='description'>Description: {spot && spot.description}</div>
      <div className='price'>Price: {spot && spot.price}</div>
      {spot && spot.images.length ? <div className='images'>
        <div>Images:</div>
        {spot.images.map((image: string) => (
          <img src={image} className='image' key={image} />
        ))}
      </div> : <></>}
      {spot && spot.reviews.length ? <div className='reviews'>
        <div>Reviews:</div>
        {spot.reviews.map((review: any, index: number) => (
          <div className='review_wrap'>
            <div className='review_id'>{index + 1}</div>
            <div className='review_content'>{review.review}</div>
          </div>
        ))}
      </div> : <></>}
    </Modal>
  );
};

export default DetailSpot;
