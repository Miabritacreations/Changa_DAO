# Images Directory

This directory contains all images used in the Changa DAO frontend application.

## 📁 Directory Structure

```
src/images/
├── team/          # Team member profile photos
├── logos/         # Company logos and branding
├── icons/         # Custom icons and graphics
└── README.md      # This file
```

## 🎯 Usage Guidelines

### Team Images (`/team/`)
- **Purpose**: Profile photos for team members
- **Format**: JPG, PNG, WebP (recommended: 400x400px)
- **Naming**: Use descriptive names like `bridgit-nyambeka.jpg`, `mirriam-njeri.png`
- **Size**: Keep under 500KB for optimal loading

### Logos (`/logos/`)
- **Purpose**: Company logos, branding elements
- **Format**: SVG (preferred), PNG with transparent background
- **Naming**: Use descriptive names like `changa-dao-logo.svg`, `logo-white.png`

### Icons (`/icons/`)
- **Purpose**: Custom icons, graphics, UI elements
- **Format**: SVG (preferred), PNG for complex graphics
- **Naming**: Use descriptive names like `dao-icon.svg`, `community-icon.png`

## 📝 Import Examples

### In React Components:
```javascript
// Import team member image
import bridgitPhoto from '../images/team/bridgit-nyambeka.jpg';

// Import logo
import logo from '../images/logos/changa-dao-logo.svg';

// Import custom icon
import daoIcon from '../images/icons/dao-icon.svg';
```

### In CSS/SCSS:
```css
.team-member {
  background-image: url('../images/team/bridgit-nyambeka.jpg');
}

.logo {
  background-image: url('../images/logos/changa-dao-logo.svg');
}
```

## 🔧 Best Practices

1. **Optimize Images**: Compress images before adding to the project
2. **Use Appropriate Formats**: 
   - SVG for logos and icons
   - WebP/PNG for photos
   - JPG for large images where quality isn't critical
3. **Consistent Naming**: Use kebab-case for file names
4. **Size Limits**: Keep images under 500KB for web performance
5. **Alt Text**: Always provide meaningful alt text when using images

## 📱 Responsive Images

For responsive images, consider using multiple sizes:
```
team/
├── bridgit-nyambeka-small.jpg  (200x200)
├── bridgit-nyambeka-medium.jpg (400x400)
└── bridgit-nyambeka-large.jpg  (800x800)
```

## 🚀 Performance Tips

- Use WebP format when possible for better compression
- Implement lazy loading for images below the fold
- Consider using CSS sprites for multiple small icons
- Use appropriate image dimensions to avoid layout shifts
