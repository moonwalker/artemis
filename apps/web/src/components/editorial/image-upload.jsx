import { useState, useEffect } from 'react'
import { useClient, endpoints } from '../../lib/moonbase'
import Loader from '../loader'

export default function ImageUpload({ image, onChange, owner, repo, branch }) {

    const client = useClient()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const select = (e) => {
        setLoading(true)
        const file = e.target.files[0];
        client.upload(endpoints.images(owner, repo, branch), file, console.log)
            .then(res => {
                if (!!res) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {

                        var img = new Image();
                        img.src = e.target.result;

                        img.onload = function () {
                            var height = this.height;
                            var width = this.width;

                            onChange({
                                contentType: file.type,
                                details: {
                                    image: { height, width },
                                    size: file.size
                                },
                                fileName: res.name,
                                url: image.url.replace(image.fileName, res.name)
                            })
                            setLoading(false)
                            return true;
                        }
                    }
                }
            }).catch(err => {
                setError(err)
                setLoading(false)
            })
    }

    return (<div>
        {loading && <Loader></Loader>}
        <div>
            <figure className="image image-preview">
                <img src={image.url} alt={image.fileName} />
            </figure>
        </div>
        <div>
            <label className="file-label">
                <input className="file-input" type="file" accept="image/*" name="image" onChange={select} />
                <span className="file-cta">
                    <span className="file-icon">
                        <svg className="fill-current text-gray-600 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                        </svg>
                    </span>
                    <span className="file-label">
                        Upload file
                    </span>
                </span>
                {error && (<span className="text-red-700 px-2 py-2">
                    {error}
                </span>)}
            </label>
        </div>
    </div >)
}
