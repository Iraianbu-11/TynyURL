import React , {useEffect, useState} from "react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/Error";
import useFetch from "@/hooks/UseFetch";
import { getUrls } from "@/db/apiUrl";
import { UrlState } from "@/Context";
import {  getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";
import { CreateLink } from "@/components/CreateLink";
const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading , error , data:urls , fn:fnUrls} = useFetch(getUrls,user?.id);
  const {loading:loadingClicks ,  data:clicks , fn:fnClicks} = useFetch(getClicksForUrls , urls?.map((url) => url.id));
  useEffect(() => {
    fnUrls()
  },[]);
  useEffect(()=>{
    if(urls?.length) fnClicks();
  },[urls?.length])

  const filteredUrls = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="mx-4 flex flex-col gap-8">
      {loading || loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="mx-4 grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mx-4 flex justify-between">
        <h1 className="text-3xl font-bold">My Links</h1>
        <CreateLink/>
      </div>

      <div className="relative">
        <Input type="text"
        value = {searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1"/>
        {
          error && <Error message={error.message}/>
        }
        {
          (filteredUrls || []).map((url,i) => {
            return <LinkCard key={i} url={url} fetchUrls={fnUrls}/>
          })
        }
      </div>
    </div>
  );
};

export default DashBoard;
