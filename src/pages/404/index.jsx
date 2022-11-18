import networkImage from '../../assets/network-offline.png'

export default () => (<div class="flex items-center justify-center h-screen">
    <div class="rounded-lg border shadow-lg p-10">
        <div>
            <img className="mx-auto w-auto" src={networkImage} alt="Artemis" />
        </div>
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                404 - Not found
            </div>
        </div>
    </div>
</div>)
