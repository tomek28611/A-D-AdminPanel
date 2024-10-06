import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "@/components/Spinner";



export default function MassageForm({
    _id,
    title: existingTitle,
    description: exitstingDescription,
    price: existingPrice,
    images: existingImages,

}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(exitstingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);



    const [goToMassages, setGoToMassages] = useState(false);

    const router = useRouter();

    async function saveMassage(ev) {
        ev.preventDefault();
        const data = {
            title, description, price,
        };
        if (_id) {
            //update
            await axios.put('/api/massages', { ...data, _id });
        } else {
            //create
            await axios.post('/api/massages', data);
        }
        setGoToMassages(true);
    }
    if (goToMassages) {
        router.push('/massages');
    }

    async function uploadImages(ev) {
        console.log(ev);
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }


    return (

        <form onSubmit={saveMassage}>

            <input type="text" placeholder="New Massage" value={title} onChange={ev => setTitle(ev.target.value)} />

            <label>
                Photos
            </label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable
                    list={images}
                    className="flex flex-wrap gap-1"
                    setList={updateImagesOrder}>
                    {/* {!!images?.length && images.map(link => (
                        <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                            <img src={link} alt="" className="rounded-lg" />
                        </div>
                    ))} */}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Add image
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden" />
                </label>
            </div>

            <textarea type="text" placeholder="desc" value={description} onChange={ev => setDescription(ev.target.value)} />
            <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button type="submit" className="btn-primary">Save</button>
        </form>

    );

}