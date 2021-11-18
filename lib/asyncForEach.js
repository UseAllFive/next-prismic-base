/* Usage: await asyncForEach(arr, async (item) => {}) */
export default async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
