export const RawEditor = ({ data, update }) => {
  const onChange = (e) => {
    update({ body: e.currentTarget.value })
  }

  return (
    <textarea
      className="bg-white w-full h-3/4 overflow-y-auto"
      defaultValue={data?.body}
      onChange={onChange}
    />
  )
}
