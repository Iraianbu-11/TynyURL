import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/Context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated,loading} = UrlState();
  useEffect(() => {
    if (isAuthenticated && !loading ) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  },[isAuthenticated,loading])
  return (
    <div className="mt-3 flex flex-col items-center gap-10">
      <h2 className="text-5xl font-extrabold">
        {searchParams.get("createNew") ? "Login" : "Login / Signup"}
      </h2>
      <Tabs defaultValue="login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
         <Login/>
        </TabsContent>
        <TabsContent value="signup">
          <Signup/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
