// import {useEffect, useState} from "react";
// import {useRouter} from "next/router";
// import axios from "axios";
// import Spinner from "@/components/Spinner";
// import {ReactSortable} from "react-sortablejs";

// export default function MassageForm({
//   _id,
//   title:existingTitle,
//   description:existingDescription,
//   price:existingPrice,
//   images:existingImages,
//   category:assignedCategory,
//   properties:assignedProperties,
//   practice:assignedPractice,
//   country:assignedCountry,
//   region:assignedRegion,
//   city:assignedCity,
//   height:assignedHeight,
//   weight:assignedWeight,
//   brest:assignedBrest,
//   visible:assignedVisible,

// }) {
//   const [title,setTitle] = useState(existingTitle || '');
//   const [description,setDescription] = useState(existingDescription || '');
//   const [category,setCategory] = useState(assignedCategory || '');
//   const [massageProperties,setMassageProperties] = useState(assignedProperties || {});
//   const [practice,setPractice] = useState(assignedPractice || []);
//   const [country,setCountry] = useState(assignedCountry || []);
//   const [region,setRegion] = useState(assignedRegion || []);
//   const [city,setCity] = useState(assignedCity || []);
//   const [height,setHeight] = useState(assignedHeight || []);
//   const [weight,setWeight] = useState(assignedWeight || []);
//   const [brest,setBrest] = useState(assignedBrest || []);
//   const [visible,setVisible] = useState(assignedVisible || []);


//   const [price,setPrice] = useState(existingPrice || '');
//   const [images,setImages] = useState(existingImages || []);
//   const [goToMassages,setGoToMassages] = useState(false);
//   const [isUploading,setIsUploading] = useState(false);
//   const [categories,setCategories] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     setCategoriesLoading(true);
//     axios.get('/api/categories').then(result => {
//       setCategories(result.data);
//       setCategoriesLoading(false);
//     })
//   }, []);
//   async function saveMassage(ev) {
//     ev.preventDefault();
//     const data = {
//       title,description,price,images,category,practice,country,region,city,height,weight,brest,visible,
//       properties:massageProperties
//     };
//     if (_id) {
//       //update
//       await axios.put('/api/massages', {...data,_id});
//     } else {
//       //create
//       await axios.post('/api/massages', data);
//     }
//     setGoToMassages(true);
//   }
//   if (goToMassages) {
//     router.push('/massages');
//   }
//   async function uploadImages(ev) {
//     const files = ev.target?.files;
//     if (files?.length > 0) {
//       setIsUploading(true);
//       const data = new FormData();
//       for (const file of files) {
//         data.append('file', file);
//       }
//       const res = await axios.post('/api/upload', data);
//       setImages(oldImages => {
//         return [...oldImages, ...res.data.links];
//       });
//       setIsUploading(false);
//     }
//   }
//   function updateImagesOrder(images) {
//     setImages(images);
//   }
//   function setMassageProp(propName,value) {
//     setMassageProperties(prev => {
//       const newMassageProps = {...prev};
//       newMassageProps[propName] = value;
//       return newMassageProps;
//     });
//   }

//   const propertiesToFill = [];
//   if (categories.length > 0 && category) {
//     let catInfo = categories.find(({_id}) => _id === category);
//     propertiesToFill.push(...catInfo.properties);
//     while(catInfo?.parent?._id) {
//       const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
//       propertiesToFill.push(...parentCat.properties);
//       catInfo = parentCat;
//     }
//   }

//   return (
//       <form onSubmit={saveMassage}>
//         <label>Massage name</label>
//         <input
//           type="text"
//           placeholder="massage name"
//           value={title}
//           onChange={ev => setTitle(ev.target.value)}/>
//         <label>Category</label>
//         <select value={category}
//                 onChange={ev => setCategory(ev.target.value)}>
//           <option value="">Uncategorized</option>
//           {categories.length > 0 && categories.map(c => (
//             <option value={c._id}>{c.name}</option>
//           ))}
//         </select>
//         {categoriesLoading && (
//           <Spinner />
//         )}
//         {propertiesToFill.length > 0 && propertiesToFill.map(p => (
//           <div className="">
//             <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
//             <div>
//               <select value={massageProperties[p.name]}
//                       onChange={ev =>
//                         setMassageProp(p.name,ev.target.value)
//                       }
//               >
//                 {p.values.map(v => (
//                   <option value={v}>{v}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         ))}
//         <label>
//           Photos
//         </label>
//         <div className="mb-2 flex flex-wrap gap-1">
//           <ReactSortable
//             list={images}
//             className="flex flex-wrap gap-1"
//             setList={updateImagesOrder}>
//             {!!images?.length && images.map(link => (
//               <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
//                 <img src={link} alt="" className="rounded-lg"/>
//               </div>
//             ))}
//           </ReactSortable>
//           {isUploading && (
//             <div className="h-24 flex items-center">
//               <Spinner />
//             </div>
//           )}
//           <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//             </svg>
//             <div>
//               Add image
//             </div>
//             <input type="file" onChange={uploadImages} className="hidden"/>
//           </label>
//         </div>
//         <label>Description</label>
//         <textarea
//           placeholder="description"
//           value={description}
//           onChange={ev => setDescription(ev.target.value)}
//         />
//         <label>Price (in USD)</label>
//         <input
//           type="number" placeholder="price"
//           value={price}
//           onChange={ev => setPrice(ev.target.value)}
//         />
//         <input type="text" placeholder="practice" value={practice} onChange={ev => setPractice(ev.target.value)}/>
//         <input type="text" placeholder="country" value={country} onChange={ev => setCountry(ev.target.value)}/>
//         <input type="text" placeholder="region" value={region} onChange={ev => setRegion(ev.target.value)}/>
//         <input type="text" placeholder="city" value={city} onChange={ev => setCity(ev.target.value)}/>
//         <input type="text" placeholder="height" value={height} onChange={ev => setHeight(ev.target.value)}/>
//         <input type="text" placeholder="weight" value={weight} onChange={ev => setWeight(ev.target.value)}/>
//         <input type="text" placeholder="brest" value={brest} onChange={ev => setBrest(ev.target.value)}/>
//         <input type="text" placeholder="visible" value={visible} onChange={ev => setVisible(ev.target.value)}/>



 
//         <button
//           type="submit"
//           className="btn-primary">
//           Save
//         </button>
//       </form>
//   );
// }