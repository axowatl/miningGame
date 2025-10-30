export async function fetchTextFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const textContent = await response.text();
    console.log(textContent); // Do something with the text content
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
