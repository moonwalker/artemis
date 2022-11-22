export default () => (<>
    <h3 class="text-3xl font-bold mb-8">403 - Restricted</h3>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <a href="/login" type="button" className="group relative flex w-full justify-center rounded-md border py-2 px-4 text-sm text-zinc-700 font-medium shadow-sm shadow-zinc-300 hover:bg-zinc-600 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2" onClick={auth.signout}>
                <span className="flex items-center mr-4">
                    <svg className="w-5 fill-zinc-700 group-hover:fill-zinc-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
                    </svg>
                </span>
                Go to login
            </a>
        </div>
    </div>
</>)
