import React from "react";
import { GithubAuthBox } from '../../components/auth'
import networkImage from '../../assets/network-offline.png'

export default () => (<div className="flex items-center justify-center h-screen">
    <div className="rounded-lg border shadow-lg p-10">
        <div>
            <img className="mx-auto w-auto" src={networkImage} alt="Artemis" />
        </div>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <GithubAuthBox />
        </div>
    </div>
</div>)
