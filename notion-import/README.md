# Notion Travel Import Starter

Import these CSV files from Notion desktop or web. Mobile import is not recommended.

## Suggested Order

1. Import `places_top_level.csv` as a new `Places` database.
2. Import `places_regions_core.csv` and `places_city_seed.csv`.
   - If Notion creates separate databases, copy rows into the same `Places` database.
3. Import `trips_template.csv` as a new `Trips` database.

## Recommended Notion Property Types

For `Places`:

- `Name`: Title
- `Level`: Select
- `Display Type`: Select
- `Parent Name`: Text
- `Top Level Name`: Text
- `Country Code`: Text
- `Region Code`: Text
- `Latitude`: Number
- `Longitude`: Number
- `Map Display`: Checkbox
- `Visited`: Checkbox
- `Stats Scope`: Select
- `Notes`: Text

For `Trips`:

- `Trip Title`: Title
- `Visited Places`: Text at first, later Relation to `Places`
- `Primary Top-level Place`: Text at first, later Relation to `Places`
- `Start Date`: Date
- `End Date`: Date
- `Cover Photo`: Files & media
- `Selected Photos`: Files & media
- `Tags`: Multi-select
- `Status`: Select
- `Language`: Select
- `Satisfaction`: Number
- `Travel Type`: Select
- `Total Cost`: Number
- `Currency`: Select
- `Guide Status`: Select
- `Notes`: Text

## Why Text Instead of Relation First?

Notion CSV import is easier and more reliable when hierarchy columns start as text. The website can still read `Parent Name`, `Top Level Name`, and codes to infer the map hierarchy. You can convert them to relations later if you want deeper Notion-side rollups.
