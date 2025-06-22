document.addEventListener('DOMContentLoaded', function() {
    console.log("Halaman Home 'Pusat Belajar' telah dimuat.");

    // Contoh interaksi sederhana: Menampilkan pesan saat tombol diklik
    const submitChallengeButton = document.querySelector('.challenge-card .btn-secondary');
    if (submitChallengeButton) {
        submitChallengeButton.addEventListener('click', () => {
            const answer = document.querySelector('.challenge-input').value;
            if (answer) {
                alert(`Jawaban Anda "${answer}" telah dikirim!`);
            } else {
                alert('Silakan isi jawaban tantangan harian.');
            }
        });
    }
});
