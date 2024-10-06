import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteMassagePage() {
  const router = useRouter();
  const [massageInfo,setMassageInfo] = useState();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/massages?id='+id).then(response => {
      setMassageInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push('/massages');
  }
  async function deleteMassage() {
    await axios.delete('/api/massages?id='+id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        {massageInfo?.title}?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteMassage}
          className="btn-red">Yes</button>
        <button
          className="btn-default"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}