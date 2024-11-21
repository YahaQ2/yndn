/**
 * Helper function untuk membuat response standar
 * 
 * @param {boolean} status - Status keberhasilan dari request
 * @param {boolean} success - Menandakan apakah operasi berhasil atau gagal
 * @param {string|null} message - Pesan tambahan (null jika tidak ada)
 * @param {object|null} data - Data yang dikembalikan (null jika tidak ada data)
 * @returns {object} - Objek response dalam format standar
*/

const response = (status, success, message = null, data = null) => {
    return {
        status, 
        success, 
        message, 
        data
    }
}

module.exports = { response }