

function Expandable({data}) {

  
  return (
    <>
      <tr>
        <td></td>
        <td>{data.name}</td>
        <td className='text-center'>{data.role}</td>
        <td></td>
      </tr>
    </>
  )
}

export default Expandable