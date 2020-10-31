const axios = require('axios')


async function getCharacter(character) {
  try {
    const result = await axios.get(`https://rickandmortyapi.com/api/character/${character}`)
    return result.data
  } catch(err) {
    console.error(err)
    throw err
  }
}

function formatData(data) {
  const formatted = data.map(functor)
  return formatted
}


const functor = ({id, name, status, ...charcater}) => {
  return {
    id,
    name,
    status
  }
}

async function main() {
  try {
    const requests = []
    for (let i=1 ; i<= 3; i++) {
      requests.push(getCharacter(i))
    }
    const data = await Promise.all(requests)
    const formattedData = formatData(data)
    console.log(formattedData)
  } catch(err) {
    console.error(err)
    throw err
  }


}
main()


// return only id namen status => tu vas utiliser map
