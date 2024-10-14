import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import styles from "../../styles/CollectionPage.module.css";

const CollectionPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [collectionItems, setCollectionItems] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    getCollection();
    getCollectionItems();
  }, [currentUser, id]);

  const getCollection = async () => {
    try {
      if (id) {
        const { data } = await axiosRes.get(`/collections/?id=${id}`);
        setCollection(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCollectionItems = async () => {
    try {
      if (id && !collectionItems?.length) {
        const { data } = await axiosRes.get(`/collections/${id}/`);
        setCollectionItems(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row className={styles.banner}>
        <Col className="align-middle">
          <h3>{collection[0]?.Owner}'s collection</h3>
        </Col>
        <Col className="align-middle">Views: {collection[0]?.Views}</Col>
        <Col className="align-middle">{collection[0]?.items_count} items</Col>
        {collection[0]?.is_owner && (
          <Col className="align-middle">
            <Link to={`/collection/${id}/add`}>
              <Button>Add Item</Button>
            </Link>
          </Col>
        )}
      </Row>

      {collectionItems?.length > 0 ? (
        <Row className={styles.itemholder}>
          {collectionItems.map((item) => (
            <Col xs={12} md={6} lg={2} key={item.id} className={styles.item}>
              <Card className={styles.card}>
                <Card.Title>
                  <Row>
                    <Col className={styles.header_item}>
                      <h5>{item.BrandName}</h5>
                      <p className={styles.series}>{item.SeriesName}</p>
                    </Col>
                    <Col
                      xs={2}
                      className={`${styles.header_item} ${styles.quantity}`}
                    >
                      x{item.Quantity}
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Body style={{ padding: "0" }}>
                  <div className={styles.img_holder}>
                    <Link to={`/collection/item/${item.id}`}>
                      <Card.Img
                        src={item.Image}
                        className={styles.img}
                        alt="collection item image"
                      ></Card.Img>
                    </Link>
                  </div>
                  <span>
                    <p>{item.Name}</p>
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className={styles.noitems}>No items</p>
      )}
    </>
  );
};

export default CollectionPage;
