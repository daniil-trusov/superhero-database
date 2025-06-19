export function validateHeroData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid hero data: expected an object");
  }

  const requiredFields = [
    "nickname",
    "real_name",
    "superpowers",
    "origin_description",
    "catch_phrase",
  ];

  const missingFields = requiredFields.filter((key) => !data[key]?.trim());

  if (missingFields.length) {
    const error = new Error(
      `Missing required fields: ${missingFields.join(", ")}`
    );
    error.status = 400;
    throw error;
  }
}
