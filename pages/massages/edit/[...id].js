import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import MassageForm from "@/components/MassageForm";
import Spinner from "@/components/Spinner";

export default function EditMassagePage() {
  const [massageInfo, setMassageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/support?id='+id).then(response => {
      setMassageInfo(response.data);
      setIsLoading(false);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit massage</h1>
      {isLoading && (
        <Spinner />
      )}
      {massageInfo && (
        <MassageForm {...massageInfo} />
      )}
    </Layout>
  );
}