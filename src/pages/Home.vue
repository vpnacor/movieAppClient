<template>
  <div class="home-page">

    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-content">
        <h1>🎬 Movie Vault</h1>
        <p>Discover timeless films, iconic stories, and cinematic experiences.</p>
        <button class="hero-btn">Explore Movies</button>
      </div>
    </section>

    <!-- FEATURED SECTION -->
    <section class="section">
      <h2>⭐ Featured Movies</h2>

      <div class="grid">

        <div class="card">
          <h3>Inception</h3>
          <span>Sci-Fi • 2010</span>
          <p>A thief enters dreams to steal secrets and faces a final mission.</p>
        </div>

        <div class="card">
          <h3>The Dark Knight</h3>
          <span>Action • 2008</span>
          <p>Batman battles the Joker in a fight for Gotham’s future.</p>
        </div>

        <div class="card">
          <h3>Interstellar</h3>
          <span>Sci-Fi • 2014</span>
          <p>A journey through space and time to save humanity.</p>
        </div>

      </div>
    </section>

    <!-- GENRE SECTION -->
    <section class="section alt">
      <h2>🎭 Browse by Genre</h2>

      <div class="genre-grid">
        <div class="genre">Action</div>
        <div class="genre">Drama</div>
        <div class="genre">Sci-Fi</div>
        <div class="genre">Horror</div>
        <div class="genre">Comedy</div>
        <div class="genre">Romance</div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <p>© 2026 Movie Vault • All Rights Reserved</p>
    </footer>

  </div>
</template>

<style scoped>
.home-page {
  background: #0f0f1a;
  color: #fff;
  font-family: Arial, sans-serif;
}

/* HERO */
.hero {
  background: linear-gradient(135deg, #141e30, #243b55);
  padding: 90px 20px;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.hero p {
  opacity: 0.8;
  margin-bottom: 20px;
}

.hero-btn {
  background: #ff3d3d;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 6px;
  cursor: pointer;
}

/* SECTIONS */
.section {
  padding: 60px 20px;
  text-align: center;
}

.section h2 {
  margin-bottom: 30px;
}


.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.card {
  background: #1c1c2b;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-6px);
  background: #26263a;
}

.card h3 {
  margin-bottom: 5px;
}

.card span {
  font-size: 0.85rem;
  opacity: 0.7;
}

.card p {
  margin-top: 10px;
  font-size: 0.9rem;
  opacity: 0.85;
}

/* GENRE */
.alt {
  background: #121222;
}

.genre-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.genre {
  background: #1c1c2b;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.genre:hover {
  background: #ff3d3d;
  color: #fff;
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 20px;
  background: #0b0b12;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>