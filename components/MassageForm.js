import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Spinner from "@/components/Spinner";



export default function MassageForm({
    name: existingName,
    email: existingEmail,
    phone: existingPhone,
    titleNr: existingTitleNr,
    vin: existingVin,
    message: existingMessage,
    title: existingTitle,


}) {

    const [title, setTitle] = useState(existingTitle || '');
    const [name, setName] = useState(existingName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [phone, setPhone] = useState(existingPhone || '');

    const [titleNr, setTitleNr] = useState(existingTitleNr || '');
    const [vin, setVin] = useState(existingVin || '');
    const [message, setMessage] = useState(existingMessage || '');
   
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



    return (

        <form onSubmit={saveMassage}>
            <label>Name</label>
            <input type="text" placeholder="New Massage" value={name} onChange={ev => setName(ev.target.value)} />
            <label>email</label>

            <input type="text" placeholder="New Massage" value={email} onChange={ev => setName(ev.target.value)} />
            <label>Phone</label>

            <input type="text" placeholder="New Massage" value={phone} onChange={ev => setName(ev.target.value)} />
            <label>Name part</label>

            <input type="text" placeholder="New Massage" value={title} onChange={ev => setName(ev.target.value)} />
            <label>Nr part</label>

            <input type="text" placeholder="New Massage" value={titleNr} onChange={ev => setName(ev.target.value)} />
            <label>VIN</label>

            <input type="text" placeholder="New Massage" value={vin} onChange={ev => setName(ev.target.value)} />
            <label>Message</label>

            <input type="text" placeholder="New Massage" value={message} onChange={ev => setName(ev.target.value)} />
           


          

            <button type="submit" className="btn-primary">Save</button>
        </form>

    );

}