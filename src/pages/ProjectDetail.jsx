<Grid container spacing={4} mb={6}>
  {/* Left - Image */}
  <Grid item xs={12} md={7}>
    <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="420"
        image={project.image}
        alt={project.name}
        sx={{ objectFit: "cover" }}
      />
    </Card>
  </Grid>

  {/* Right - Info */}
  <Grid item xs={12} md={5}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Location + Category */}
      <Box display="flex" alignItems="center" gap={1}>
        <LocationIcon sx={{ color: "text.secondary" }} />
        <Typography variant="body2" color="text.secondary">
          {project.location}
        </Typography>
        <Chip
          label={project.category}
          size="small"
          sx={{
            ml: "auto",
            background: `linear-gradient(135deg, ${project.categoryColor} 0%, ${project.categoryColor}90 100%)`,
            color: "white",
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {project.name}
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {project.description}
      </Typography>

      {/* Funding Progress */}
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ${project.raised.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            of ${project.goal.toLocaleString()} goal
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={project.fundingProgress}
          sx={{
            height: 12,
            borderRadius: 6,
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, ${project.categoryColor} 0%, ${project.categoryColor}80 100%)`,
            },
          }}
        />
        <Typography variant="subtitle2" color="text.secondary" mt={1}>
          {project.fundingProgress}% funded
        </Typography>
      </Box>

      {/* CTA Buttons */}
      <Stack spacing={1.5} mt={2}>
        <Button
          variant="contained"
          size="large"
          startIcon={<FundIcon />}
          onClick={() => setShowFundingDialog(true)}
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            background: `linear-gradient(135deg, ${project.categoryColor} 0%, ${project.categoryColor}80 100%)`,
          }}
        >
          Fund This Project
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={() => setIsLiked(!isLiked)}
            fullWidth
          >
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button variant="outlined" startIcon={<ShareIcon />} fullWidth>
            Share
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Grid>
</Grid>
