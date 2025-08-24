import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {/* About Us */}
      <Box mb={6}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" lineHeight={1.8}>
          Changa DAO is a blockchain-powered crowdfunding platform that helps
          communities bring real-world social projects to life. From schools
          and boreholes to health clinics, we enable communities to raise
          funds transparently, track progress with geo-tagged proof, and
          release funds milestone by milestone.
        </Typography>
        <Typography variant="body1" mt={2}>
          By combining decentralized governance with investor incentives, Changa
          DAO ensures that every contribution—whether a donation or an
          investment—creates measurable, lasting impact.
        </Typography>
      </Box>

      {/* Mission & Vision */}
      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              To empower communities to build sustainable social projects by
              creating a trusted, transparent, and decentralized funding
              ecosystem.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1">
              A world where every community has the resources to create lasting
              change—powered by transparency, collaboration, and blockchain
              innovation.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Values */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Our Values
        </Typography>
        <ul>
          <li><strong>Transparency:</strong> Every transaction and milestone is verifiable on-chain.</li>
          <li><strong>Community Ownership:</strong> Local stakeholders govern their own projects through DAO voting.</li>
          <li><strong>Accountability:</strong> Funds are released only when milestones are verified.</li>
          <li><strong>Impact First:</strong> Every project must create tangible benefits for people on the ground.</li>
          <li><strong>Sustainability:</strong> We focus on solutions that last for generations, not just quick fixes.</li>
        </ul>
      </Box>

      {/* How It Works */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          How It Works
        </Typography>
        <ol>
          <li><strong>Communities Propose Projects:</strong> Schools, boreholes, clinics, and other initiatives are submitted and tokenized into NFTs or digital tokens.</li>
          <li><strong>Fundraising via NFTs:</strong> Donors and investors purchase NFTs that serve as proof of contribution and impact tokens.</li>
          <li><strong>Milestone-Based Funding:</strong> Funds are held in smart contracts and released only after milestones are verified with geo-tagged photos, videos, and DAO approval.</li>
          <li><strong>Impact Tracking:</strong> Donors and investors view progress in real time through dashboards and maps, ensuring accountability and transparency.</li>
        </ol>
      </Box>

      {/* Why Changa DAO */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Why Changa DAO
        </Typography>
        <ul>
          <li>Tokenized Real-World Projects – Turning social projects into blockchain-backed opportunities.</li>
          <li>Fraud-Proof Milestone Funding – Money is released step by step, not all at once.</li>
          <li>Geo-Tagged Impact Proof – Real images, videos, and GPS locations confirm results.</li>
          <li>Local DAO Governance – Communities take charge of their own projects.</li>
          <li>Dual ROI – Investors enjoy both financial returns and measurable social impact.</li>
        </ul>
      </Box>

      {/* Team */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1">
          We are a collective of innovators, technologists, and community leaders passionate about using blockchain to drive real-world change.
          (👉 Add founder names, roles, and photos later)
        </Typography>
      </Box>

      {/* FAQs */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          FAQs
        </Typography>
        <ul>
          <li><strong>Q: What is Changa DAO?</strong> A platform that combines crowdfunding, blockchain, and DAO governance to fund real-world community projects.</li>
          <li><strong>Q: How do I fund a project?</strong> Simply choose a project, connect your wallet (or use mobile money/fiat), and purchase NFTs to contribute.</li>
          <li><strong>Q: Can I invest without crypto knowledge?</strong> Yes! We support mobile-friendly wallets, fiat payments, and easy onboarding for non-crypto users.</li>
          <li><strong>Q: How are projects verified?</strong> Through geo-tagged photos/videos, DAO governance votes, and milestone-based smart contracts.</li>
          <li><strong>Q: What returns can I expect?</strong> Donors receive proof-of-impact NFTs. Investors in revenue-generating projects receive revenue shares or tokenized returns.</li>
        </ul>
      </Box>

      {/* Contact */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          📧 Email: <a href="mailto:hello@changadao.org">hello@changadao.org</a><br/>
          🌍 Social: [Twitter] [LinkedIn] [Telegram] [Instagram]<br/>
          📩 Launch a Project Form → (*button: “Submit a Project”*)
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
