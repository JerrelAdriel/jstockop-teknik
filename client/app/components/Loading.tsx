import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loading(){
    return(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white opacity-75">
          <Spinner size="lg"/>
        </div>
    )
}