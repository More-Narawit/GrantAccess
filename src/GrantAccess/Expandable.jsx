import './GrantAccess.css';
function Expandable({ data, isOpen }) {
  return (
      <>
          {isOpen && (
              <tr>
                  <td></td>
                  <td>{data.name}</td>
                  <td className='text-center'>{data.role}</td>
                  <td></td>
              </tr>
          )}
      </>
  );
}

export default Expandable;
