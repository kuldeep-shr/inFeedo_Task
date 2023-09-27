"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nearbyCoordinates = void 0;
// interface returnOutputs {
//   coordinates: nestedCoordinatesInpute[];
// }
// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}
// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
//get nearby coordinates within in a 1KM
const nearbyCoordinates = (cdns) => {
    return cdns.coordinates.filter((d) => {
        return calculateDistance(cdns.userLat, cdns.userLon, d.lat, d.lon) <= 1;
    });
};
exports.nearbyCoordinates = nearbyCoordinates;
// Find nearby coordinates within 1 km radius
// const nearbyCoordinates = coordinates.filter((coord) => {
//   const distance = calculateDistance(userLat, userLon, coord.lat, coord.lon);
//   return distance <= 1;
// });
//# sourceMappingURL=nearbyCoordinates.js.map