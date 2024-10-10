import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button, Col, Image, Row } from 'react-bootstrap';

const CollectionPage = () => {
    
  const {id} = useParams();
  const [collection, setCollection] = useState({});
  const [collectionItems, setCollectionItems] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    getCollection();
    getCollectionItems();
  },[currentUser,id])

  const getCollection = async() => {
    try {
      if (id) {
        const {data} = await axiosRes.get(`/collections/?id=${id}`);
        setCollection(data.results);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const getCollectionItems = async() => {
    try {
      if (id && !collectionItems?.length) {
        const {data} = await axiosRes.get(`/collections/${id}/`);
        setCollectionItems(data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p>{collection[0]?.Owner}'s collection with {collection[0]?.Views} views</p>
      <p>{collection[0]?.items_count} items</p>
      {collection[0]?.is_owner && 
      <Link to={`/collection/${id}/add`}>
        <Button>Add Item</Button>
      </Link>
      }
      <Row>
        {collectionItems?.length > 0 ? (
          collectionItems.map(item => (
            <Col xs={12} md={6} lg={4}>
              <p>{item.Name} x{item.Quantity}</p>
              <Image src={item.Image} height={200}/>
            </Col>
          ))
          
        ) : (
          <p>No items</p>
        )}
        
      </Row>
    </div>
  )
}

export default CollectionPage