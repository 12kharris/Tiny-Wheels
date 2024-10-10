import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

const AddCollectionItem = () => {

    const {id} = useParams();
    const history = useHistory();
    const [series, setSeries] = useState([]);
    const [collectionItemFormData, setCollectionItemFormData] = useState({
        Name: "",
        Series: "",
        Quantity: 0,
        Image: null
    })
    const {name, itemSeries, quantity, image} = collectionItemFormData;
    const imageInput = useRef(null);

    const getSeries = async() => {
        try {
            const {data} = await axiosRes.get("/series/");
            setSeries(data.results);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
          // store the image in the browser local storage
          URL.revokeObjectURL(image);
          setCollectionItemFormData({
            ...collectionItemFormData,
            image: URL.createObjectURL(event.target.files[0]),
          });
        }
      };

    const handleChange = (event) => {
        setCollectionItemFormData({
            ...collectionItemFormData,
            [event.target.name]: event.target.value,
          });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("Name", collectionItemFormData.Name);
        formData.append("Series", collectionItemFormData.Series);
        formData.append("Quantity", collectionItemFormData.Quantity);
        formData.append("Image", imageInput.current.files[0]);
        
        try {
            await axiosReq.post("/collections/items/", formData);
            history.push(`/collection/${id}`);
        }
        catch (err) {
            console.log(err?.response.data);
        }
    }

    useEffect(() => {
        getSeries();
    },[])

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Model Name</Form.Label>
                <Form.Control type='text' name='Name' id='Name' value={name} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Series</Form.Label>
                <Form.Control as="select" onChange={handleChange} name="Series">
                    {series?.map(s => (
                            <option key={s.id} value={s.id}>{`${s.SeriesName} - ${s.BrandName}`}</option> 
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type='number' name='Quantity' min={1} value={quantity} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group>
        
        {image ? (
            <>
            <Form.Label htmlFor="image-upload">Change Image</Form.Label>
            <Image src={image} />
            </>
        ) : (
            <Form.Label htmlFor="image-upload">Upload an image</Form.Label>
        )}
        <Form.File
          id="image-upload"
          accept="image/*"
          name="Image"
          ref={imageInput}
          onChange={handleChangeImage}
        ></Form.File>
      </Form.Group>
      <Button type='submit' variant='success'>Add to collection</Button>
        </Form>
    </div>
  )
}

export default AddCollectionItem