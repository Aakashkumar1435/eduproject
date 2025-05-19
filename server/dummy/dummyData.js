import mongoose from "mongoose";
import All from "../models/All.js";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Education", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

async function insertPhysicsTests() {
  try {
    // 3. Rotational and Circular Motion
    const rotationalMotionTest = new All({
      name: "Rotational and Circular Motion Test",
      description: "A comprehensive test covering key concepts of rotational and circular motion in physics.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bd5"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "What is the formula for angular velocity?",
          options: ["ω = θ/t", "ω = v/r", "ω = at", "ω = 2πf"],
          correctAnswer: 0,
          reason: "Angular velocity (ω) is defined as the angle (θ) swept per unit time (t)."
        },
        {
          question: "What provides the centripetal force for a satellite orbiting Earth?",
          options: ["Gravity", "Air resistance", "Magnetic force", "Electric force"],
          correctAnswer: 0,
          reason: "Gravity provides the centripetal force that keeps satellites in orbit around Earth."
        },
        {
          question: "The moment of inertia of an object depends on:",
          options: ["Mass distribution and axis of rotation", "Mass only", "Velocity", "Acceleration"],
          correctAnswer: 0,
          reason: "Moment of inertia depends on both the distribution of mass and the axis about which rotation occurs."
        },
        {
          question: "What is the formula for centripetal acceleration?",
          options: ["a = v²/r", "a = v/t", "a = ωr", "a = rω²"],
          correctAnswer: 0,
          reason: "Centripetal acceleration is calculated as a = v²/r, where v is tangential velocity and r is radius."
        },
        {
          question: "Angular momentum is conserved when:",
          options: ["No external torque acts on the system", "Velocity is constant", "Mass is uniformly distributed", "Acceleration is zero"],
          correctAnswer: 0,
          reason: "Angular momentum is conserved when no external torque acts on the system."
        },
        {
          question: "The rotational kinetic energy of a rigid body is given by:",
          options: ["½Iω²", "½mv²", "mgh", "Iα"],
          correctAnswer: 0,
          reason: "Rotational kinetic energy is calculated as KE = ½Iω², where I is moment of inertia and ω is angular velocity."
        },
        {
          question: "What happens to the angular velocity of a spinning ice skater when they pull their arms inward?",
          options: ["Increases", "Decreases", "Remains constant", "Becomes zero"],
          correctAnswer: 0,
          reason: "Angular velocity increases due to conservation of angular momentum when moment of inertia decreases."
        },
        {
          question: "The relation between linear velocity v and angular velocity ω is:",
          options: ["v = rω", "v = ω/r", "v = r/ω", "v = ω²r"],
          correctAnswer: 0,
          reason: "The linear velocity is related to angular velocity by v = rω, where r is the radius."
        },
        {
          question: "Torque is defined as:",
          options: ["Force × perpendicular distance from axis", "Force × time", "Force × acceleration", "Force × velocity"],
          correctAnswer: 0,
          reason: "Torque is calculated as force multiplied by the perpendicular distance from the axis of rotation."
        },
        {
          question: "A wheel rolling without slipping has:",
          options: ["Both translational and rotational motion", "Only rotational motion", "Only translational motion", "Neither translational nor rotational motion"],
          correctAnswer: 0,
          reason: "A wheel rolling without slipping exhibits both translational motion of its center of mass and rotational motion about its axis."
        },
        {
          question: "The angular acceleration of a body is defined as:",
          options: ["Rate of change of angular velocity", "Rate of change of linear velocity", "Rate of change of displacement", "Rate of change of linear acceleration"],
          correctAnswer: 0,
          reason: "Angular acceleration (α) is the rate of change of angular velocity (ω) with respect to time."
        },
        {
          question: "In a uniform circular motion, the speed of the object is:",
          options: ["Constant", "Increasing", "Decreasing", "Zero"],
          correctAnswer: 0,
          reason: "In uniform circular motion, the speed (magnitude of velocity) remains constant while the direction changes continuously."
        },
        {
          question: "The radius of gyration of a body is:",
          options: ["√(I/m)", "I/m", "√(m/I)", "m/I"],
          correctAnswer: 0,
          reason: "The radius of gyration (k) is defined as k = √(I/m), where I is the moment of inertia and m is the mass."
        },
        {
          question: "For an object moving in a circle at constant speed, which of the following is true?",
          options: ["The acceleration is directed toward the center", "The acceleration is zero", "The acceleration is directed tangent to the path", "The acceleration is directed away from the center"],
          correctAnswer: 0,
          reason: "In circular motion, the acceleration (centripetal acceleration) is directed toward the center of the circle."
        },
        {
          question: "The period of rotation is related to angular velocity by:",
          options: ["T = 2π/ω", "T = ω/2π", "T = 2πω", "T = 1/ω"],
          correctAnswer: 0,
          reason: "The period of rotation (T) is related to angular velocity (ω) by T = 2π/ω."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Medium",
      averageScore: 0,
      userProgress: []
    });

    // 4. Waves and Sounds
    const wavesSoundsTest = new All({
      name: "Waves and Sounds Test",
      description: "A comprehensive test on wave properties, behavior, and sound phenomena.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bd6"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "In a transverse wave, the particles of the medium move:",
          options: ["Perpendicular to the direction of wave propagation", "Parallel to the direction of wave propagation", "In circular paths", "In random directions"],
          correctAnswer: 0,
          reason: "In transverse waves, particles oscillate perpendicular to the direction in which the wave travels."
        },
        {
          question: "The speed of sound in air at 20°C is approximately:",
          options: ["343 m/s", "300 m/s", "3000 m/s", "1500 m/s"],
          correctAnswer: 0,
          reason: "The speed of sound in air at 20°C is approximately 343 meters per second."
        },
        {
          question: "The phenomenon where a wave bends around obstacles is called:",
          options: ["Diffraction", "Refraction", "Reflection", "Interference"],
          correctAnswer: 0,
          reason: "Diffraction is the phenomenon where waves bend around obstacles or through openings."
        },
        {
          question: "Which of the following is NOT a property of waves?",
          options: ["Mass", "Amplitude", "Wavelength", "Frequency"],
          correctAnswer: 0,
          reason: "Mass is not a property of waves. Waves are characterized by properties such as amplitude, wavelength, frequency, and speed."
        },
        {
          question: "The Doppler effect explains:",
          options: ["The change in frequency due to relative motion", "The bending of waves around obstacles", "The superposition of waves", "The reflection of waves"],
          correctAnswer: 0,
          reason: "The Doppler effect describes the change in frequency of a wave due to relative motion between the source and observer."
        },
        {
          question: "Resonance occurs when:",
          options: ["The driving frequency matches the natural frequency", "Two waves cancel each other", "A wave changes direction", "A wave loses energy"],
          correctAnswer: 0,
          reason: "Resonance occurs when the frequency of an applied force matches the natural frequency of a system."
        },
        {
          question: "What type of wave requires a medium to propagate?",
          options: ["Mechanical wave", "Electromagnetic wave", "Matter wave", "Gravitational wave"],
          correctAnswer: 0,
          reason: "Mechanical waves require a medium to propagate, unlike electromagnetic waves which can travel through vacuum."
        },
        {
          question: "The formula for the speed of a wave is:",
          options: ["v = fλ", "v = f/λ", "v = λ/f", "v = f²λ"],
          correctAnswer: 0,
          reason: "The wave speed (v) equals the product of frequency (f) and wavelength (λ): v = fλ."
        },
        {
          question: "When two waves meet and combine, this phenomenon is called:",
          options: ["Interference", "Diffraction", "Refraction", "Polarization"],
          correctAnswer: 0,
          reason: "Interference is the phenomenon where two waves superimpose to form a resultant wave of greater or lower amplitude."
        },
        {
          question: "In a standing wave, which points remain stationary?",
          options: ["Nodes", "Antinodes", "Crests", "Troughs"],
          correctAnswer: 0,
          reason: "In a standing wave, nodes are points that remain stationary (zero amplitude) throughout the oscillation."
        },
        {
          question: "The loudness of a sound is related to its:",
          options: ["Amplitude", "Frequency", "Wavelength", "Speed"],
          correctAnswer: 0,
          reason: "The loudness of a sound is primarily determined by its amplitude. Higher amplitude results in louder sound."
        },
        {
          question: "The pitch of a sound is determined by its:",
          options: ["Frequency", "Amplitude", "Wavelength", "Intensity"],
          correctAnswer: 0,
          reason: "The pitch of a sound is determined by its frequency. Higher frequency sounds have higher pitch."
        },
        {
          question: "The phenomenon where a wave changes direction when passing from one medium to another is called:",
          options: ["Refraction", "Reflection", "Diffraction", "Dispersion"],
          correctAnswer: 0,
          reason: "Refraction is the change in direction of a wave as it passes from one medium to another due to a change in speed."
        },
        {
          question: "The minimum distance needed for an echo to be heard separately from the original sound is:",
          options: ["17 meters", "10 meters", "34 meters", "5 meters"],
          correctAnswer: 0,
          reason: "For an echo to be heard as distinct from the original sound, the reflecting surface must be at least 17 meters away (assuming sound travels at about 340 m/s)."
        },
        {
          question: "What happens to the wavelength of a sound wave when it travels from air into water?",
          options: ["Decreases", "Increases", "Remains the same", "Becomes zero"],
          correctAnswer: 0,
          reason: "When sound travels from air into water, its wavelength decreases because the speed of sound is different in the two media while the frequency remains constant."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Medium",
      averageScore: 0,
      userProgress: []
    });

    // 5. Oscillations
    const oscillationsTest = new All({
      name: "Oscillations Test",
      description: "A comprehensive test covering simple harmonic motion and other oscillatory phenomena.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bd7"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "In simple harmonic motion, the acceleration is:",
          options: ["Proportional to displacement and in opposite direction", "Proportional to velocity", "Constant", "Zero"],
          correctAnswer: 0,
          reason: "In SHM, acceleration is directly proportional to displacement and oppositely directed: a = -ω²x."
        },
        {
          question: "The time period of a simple pendulum depends on:",
          options: ["Length and gravitational acceleration", "Mass of the bob", "Amplitude of oscillation", "Initial velocity"],
          correctAnswer: 0,
          reason: "The time period of a simple pendulum depends only on its length and gravitational acceleration: T = 2π√(L/g)."
        },
        {
          question: "The equation of simple harmonic motion is:",
          options: ["x = A cos(ωt + φ)", "x = A sin(ωt)", "x = A/ωt", "x = At²"],
          correctAnswer: 0,
          reason: "The general equation for SHM is x = A cos(ωt + φ), where A is amplitude, ω is angular frequency, and φ is phase constant."
        },
        {
          question: "In a mass-spring system, the time period is given by:",
          options: ["T = 2π√(m/k)", "T = 2π√(k/m)", "T = 2π√(mg)", "T = 2πm/k"],
          correctAnswer: 0,
          reason: "The time period of a mass-spring system is T = 2π√(m/k), where m is mass and k is spring constant."
        },
        {
          question: "At which point is the velocity maximum in simple harmonic motion?",
          options: ["Mean position", "Extreme position", "At all positions", "Quarter wavelength from mean position"],
          correctAnswer: 0,
          reason: "In SHM, velocity is maximum at the mean position (equilibrium position) where displacement is zero."
        },
        {
          question: "Damping in an oscillatory system causes:",
          options: ["Decrease in amplitude over time", "Increase in frequency", "Increase in amplitude", "No change in motion"],
          correctAnswer: 0,
          reason: "Damping causes a decrease in amplitude over time due to energy dissipation."
        },
        {
          question: "The total energy in simple harmonic motion is:",
          options: ["Constant throughout the motion", "Maximum at extreme positions", "Maximum at mean position", "Zero at extreme positions"],
          correctAnswer: 0,
          reason: "The total energy (kinetic + potential) remains constant throughout simple harmonic motion."
        },
        {
          question: "What is the phase difference between displacement and acceleration in SHM?",
          options: ["180°", "90°", "0°", "45°"],
          correctAnswer: 0,
          reason: "In SHM, acceleration is 180° (π radians) out of phase with displacement."
        },
        {
          question: "A body executing SHM has maximum acceleration at:",
          options: ["Extreme positions", "Mean position", "Halfway between mean and extreme positions", "All positions"],
          correctAnswer: 0,
          reason: "In SHM, acceleration is maximum at the extreme positions where displacement is maximum."
        },
        {
          question: "The frequency of a simple pendulum is independent of:",
          options: ["Mass of the bob", "Amplitude (for small oscillations)", "Length of the pendulum", "Gravitational acceleration"],
          correctAnswer: 0,
          reason: "For small oscillations, the frequency of a simple pendulum is independent of the mass of the bob."
        },
        {
          question: "In a mass-spring system, doubling the mass will change the period by a factor of:",
          options: ["√2", "2", "1/2", "4"],
          correctAnswer: 0,
          reason: "Since T = 2π√(m/k), doubling the mass increases the period by a factor of √2."
        },
        {
          question: "The velocity of a particle in SHM is zero at:",
          options: ["Extreme positions", "Mean position", "All positions", "No position"],
          correctAnswer: 0,
          reason: "In SHM, velocity is zero at the extreme positions (maximum displacement points)."
        },
        {
          question: "Critical damping in an oscillatory system:",
          options: ["Returns to equilibrium in minimum time without oscillation", "Produces maximum oscillations", "Increases the frequency", "Increases the amplitude"],
          correctAnswer: 0,
          reason: "Critical damping returns the system to equilibrium in the minimum time without oscillating."
        },
        {
          question: "In forced oscillations, resonance occurs when:",
          options: ["Driving frequency equals natural frequency", "Driving frequency is much higher than natural frequency", "Driving frequency is much lower than natural frequency", "Driving frequency is zero"],
          correctAnswer: 0,
          reason: "Resonance occurs when the driving frequency equals the natural frequency of the oscillating system."
        },
        {
          question: "What happens to the time period of a simple pendulum if its length is quadrupled?",
          options: ["Doubles", "Quadruples", "Halves", "Remains the same"],
          correctAnswer: 0,
          reason: "Since T = 2π√(L/g), quadrupling the length doubles the time period (√4 = 2)."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Medium",
      averageScore: 0,
      userProgress: []
    });

    // 6. Thermodynamics
    const thermodynamicsTest = new All({
      name: "Thermodynamics Test",
      description: "A comprehensive test covering laws of thermodynamics, heat transfer, and thermal processes.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bd8"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "The zeroth law of thermodynamics is the basis for:",
          options: ["Temperature measurement", "Energy conservation", "Entropy increase", "Heat engines"],
          correctAnswer: 0,
          reason: "The zeroth law states that if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other, providing the basis for temperature measurement."
        },
        {
          question: "The first law of thermodynamics is essentially the law of:",
          options: ["Conservation of energy", "Entropy increase", "Thermal equilibrium", "Heat transfer"],
          correctAnswer: 0,
          reason: "The first law of thermodynamics states that energy cannot be created or destroyed, only transformed, which is the principle of energy conservation."
        },
        {
          question: "In an isothermal process:",
          options: ["Temperature remains constant", "Pressure remains constant", "Volume remains constant", "Entropy remains constant"],
          correctAnswer: 0,
          reason: "In an isothermal process, the temperature of the system remains constant throughout."
        },
        {
          question: "The efficiency of a Carnot heat engine depends on:",
          options: ["Only the temperatures of the hot and cold reservoirs", "The working substance", "The size of the engine", "The speed of operation"],
          correctAnswer: 0,
          reason: "The efficiency of a Carnot engine depends only on the temperatures of the hot and cold reservoirs: η = 1 - Tc/Th."
        },
        {
          question: "Which of the following is NOT a method of heat transfer?",
          options: ["Convection", "Conduction", "Radiation", "Reflection"],
          correctAnswer: 3,
          reason: "The three methods of heat transfer are conduction, convection, and radiation. Reflection is not a method of heat transfer."
        },
        {
          question: "The second law of thermodynamics implies that:",
          options: ["The entropy of an isolated system never decreases", "Energy is conserved", "Heat always flows from cold to hot", "Temperature always increases"],
          correctAnswer: 0,
          reason: "The second law of thermodynamics states that the entropy of an isolated system never decreases over time."
        },
        {
          question: "In an adiabatic process:",
          options: ["No heat is transferred", "Temperature remains constant", "Pressure remains constant", "Volume remains constant"],
          correctAnswer: 0,
          reason: "In an adiabatic process, no heat is transferred between the system and its surroundings."
        },
        {
          question: "The internal energy of an ideal gas depends only on its:",
          options: ["Temperature", "Pressure", "Volume", "Mass density"],
          correctAnswer: 0,
          reason: "For an ideal gas, the internal energy depends only on temperature, not on pressure or volume."
        },
        {
          question: "What happens to the temperature of an ideal gas during free expansion into vacuum?",
          options: ["Remains constant", "Increases", "Decreases", "First increases then decreases"],
          correctAnswer: 0,
          reason: "During free expansion of an ideal gas into vacuum, no work is done and no heat is transferred, so the temperature remains constant."
        },
        {
          question: "The specific heat capacity of a substance is:",
          options: ["The amount of heat required to raise the temperature of unit mass by 1°C", "The total heat content", "The rate of heat flow", "The heat released during phase change"],
          correctAnswer: 0,
          reason: "Specific heat capacity is the amount of heat energy required to raise the temperature of one unit of mass by one degree Celsius."
        },
        {
          question: "In a cyclic process, the change in internal energy is:",
          options: ["Zero", "Maximum", "Minimum", "Depends on the path"],
          correctAnswer: 0,
          reason: "In a cyclic process, the system returns to its initial state, so the net change in internal energy is zero."
        },
        {
          question: "The work done in an isothermal expansion of an ideal gas is:",
          options: ["nRT ln(V₂/V₁)", "nRT(V₂-V₁)", "P(V₂-V₁)", "nCV(T₂-T₁)"],
          correctAnswer: 0,
          reason: "The work done in an isothermal expansion of an ideal gas is W = nRT ln(V₂/V₁)."
        },
        {
          question: "Which process has the highest efficiency in a heat engine?",
          options: ["Carnot cycle", "Otto cycle", "Diesel cycle", "Rankine cycle"],
          correctAnswer: 0,
          reason: "The Carnot cycle has the highest theoretical efficiency possible for any heat engine operating between two temperature reservoirs."
        },
        {
          question: "The relation between pressure (P), volume (V), and temperature (T) for an ideal gas is:",
          options: ["PV = nRT", "P/V = nRT", "PT = nRV", "PVT = nR"],
          correctAnswer: 0,
          reason: "The ideal gas law is PV = nRT, where n is the number of moles and R is the gas constant."
        },
        {
          question: "The entropy change in a reversible isothermal process is given by:",
          options: ["ΔS = Q/T", "ΔS = Q×T", "ΔS = 0", "ΔS = nR ln(T₂/T₁)"],
          correctAnswer: 0,
          reason: "For a reversible isothermal process, the entropy change is calculated as ΔS = Q/T, where Q is the heat transferred and T is the constant temperature."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Hard",
      averageScore: 0,
      userProgress: []
    });

    // 7. Electrostatics
    const electrostaticsTest = new All({
      name: "Electrostatics Test",
      description: "A comprehensive test covering electric charges, fields, potentials, and related phenomena.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bd9"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "Coulomb's law states that the force between two point charges is:",
          options: ["Proportional to the product of charges and inversely proportional to square of distance", "Proportional to the sum of charges", "Proportional to distance between charges", "Independent of the medium"],
          correctAnswer: 0,
          reason: "Coulomb's law states that the electrostatic force is proportional to the product of charges and inversely proportional to the square of the distance between them."
        },
        {
          question: "Electric field lines:",
          options: ["Begin on positive charges and end on negative charges", "Form closed loops", "Always point southward", "Cannot cross each other"],
          correctAnswer: 0,
          reason: "Electric field lines originate from positive charges and terminate on negative charges."
        },
        {
          question: "The electric potential at a point is defined as:",
          options: ["Work done per unit positive charge in bringing it from infinity to that point", "Force per unit charge", "Energy per unit volume", "Force per unit area"],
          correctAnswer: 0,
          reason: "Electric potential is defined as the work done per unit positive charge in bringing it from infinity to that point."
        },
        {
          question: "Gauss's law relates:",
          options: ["Electric flux through a closed surface to the enclosed charge", "Magnetic field to electric current", "Electric field to magnetic field", "Potential to current"],
          correctAnswer: 0,
          reason: "Gauss's law relates the electric flux through a closed surface to the enclosed electric charge."
        },
        {
          question: "The electric field inside a charged conducting hollow sphere is:",
          options: ["Zero", "Constant and non-zero", "Decreasing towards the center", "Increasing towards the center"],
          correctAnswer: 0,
          reason: "Inside a charged conducting hollow sphere, the electric field is zero due to the arrangement of charges on the surface."
        },
        {
          question: "Equipotential surfaces are:",
          options: ["Surfaces with constant electric potential", "Surfaces with constant electric field", "Surfaces with constant charge density", "Surfaces with constant force"],
          correctAnswer: 0,
          reason: "Equipotential surfaces are surfaces where the electric potential is constant throughout."
        },
        {
          question: "The SI unit of electric field is:",
          options: ["N/C or V/m", "N·m²/C²", "C/m²", "J/C·m"],
          correctAnswer: 0,
          reason: "The SI unit of electric field is newton per coulomb (N/C) or volt per meter (V/m)."
        },
        {
          question: "The principle of superposition for electric fields states that:",
          options: ["The resultant field is the vector sum of individual fields", "The resultant field is the product of individual fields", "Electric fields cannot superimpose", "The strongest field dominates"],
          correctAnswer: 0,
          reason: "According to the principle of superposition, the resultant electric field is the vector sum of the individual electric fields."
        },
        {
          question: "The electric potential energy of two point charges q₁ and q₂ separated by distance r is:",
          options: ["kq₁q₂/r", "kq₁q₂r", "k(q₁+q₂)/r", "kq₁q₂r²"],
          correctAnswer: 0,
          reason: "The electric potential energy of two point charges is given by U = kq₁q₂/r, where k is Coulomb's constant."
        },
        {
          question: "The electrostatic force is:",
          options: ["Conservative", "Non-conservative", "Sometimes conservative", "Neutral"],
          correctAnswer: 0,
          reason: "The electrostatic force is a conservative force, meaning the work done is independent of the path taken."
        },
        {
          question: "The electric field due to a point charge varies with distance r as:",
          options: ["1/r²", "1/r", "r", "r²"],
          correctAnswer: 0,
          reason: "The electric field due to a point charge decreases as the square of the distance from the charge (1/r²)."
        },
        {
          question: "The electric field inside a uniformly charged solid sphere at distance r from center (r < R, where R is radius) is:",
          options: ["Proportional to r", "Proportional to 1/r²", "Constant", "Zero"],
          correctAnswer: 0,
          reason: "Inside a uniformly charged solid sphere, the electric field is directly proportional to the distance from the center."
        },
        {
          question: "When a dielectric material is placed in an electric field, the field inside the dielectric:",
          options: ["Decreases", "Increases", "Remains the same", "Becomes zero"],
          correctAnswer: 0,
          reason: "When a dielectric is placed in an electric field, the field inside the dielectric decreases due to polarization."
        },
        {
          question: "The concept of electric dipole moment is associated with:",
          options: ["Two equal and opposite charges separated by a small distance", "Two like charges", "A single charge", "A system of randomly distributed charges"],
          correctAnswer: 0,
          reason: "Electric dipole moment is associated with two equal and opposite charges separated by a small distance."
        },
        {
          question: "The relationship between electric field E and electric potential V is:",
          options: ["E = -∇V", "E = ∇V", "E = V/d", "E × V = constant"],
          correctAnswer: 0,
          reason: "The electric field is the negative gradient of the electric potential: E = -∇V."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Hard",
      averageScore: 0,
      userProgress: []
    });

    // 8. Current Electricity
    const currentElectricityTest = new All({
      name: "Current Electricity Test",
      description: "A comprehensive test covering electric current, circuits, resistance, and related concepts.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bda"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "Ohm's law states that:",
          options: ["Current is proportional to voltage for a conductor at constant temperature", "Current is proportional to resistance", "Voltage is proportional to resistance", "Power is proportional to current"],
          correctAnswer: 0,
          reason: "Ohm's law states that the current through a conductor is directly proportional to the voltage across it at constant temperature: I = V/R."
        },
        {
          question: "The SI unit of electrical resistivity is:",
          options: ["Ohm-meter (Ω·m)", "Ohm (Ω)", "Ohm/meter (Ω/m)", "Ohm·meter² (Ω·m²)"],
          correctAnswer: 0,
          reason: "The SI unit of electrical resistivity is ohm-meter (Ω·m)."
        },
        {
          question: "Kirchhoff's current law is based on the conservation of:",
          options: ["Electric charge", "Energy", "Momentum", "Mass"],
          correctAnswer: 0,
          reason: "Kirchhoff's current law is based on the principle of conservation of electric charge."
        },
        {
          question: "The equivalent resistance of two resistors R₁ and R₂ connected in parallel is:",
          options: ["(R₁×R₂)/(R₁+R₂)", "R₁+R₂", "R₁×R₂", "√(R₁×R₂)"],
          correctAnswer: 0,
          reason: "For resistors in parallel, the equivalent resistance is given by Req = (R₁×R₂)/(R₁+R₂)."
        },
        {
          question: "Kirchhoff's voltage law states that:",
          options: ["The algebraic sum of all potential differences in a closed loop is zero", "The sum of currents at a junction is zero", "The power in a circuit is conserved", "The resistance in a closed loop is constant"],
          correctAnswer: 0,
          reason: "Kirchhoff's voltage law states that the algebraic sum of all potential differences in a closed loop is zero, based on conservation of energy."
        },
        {
          question: "The electrical power dissipated in a resistor is given by:",
          options: ["P = I²R", "P = IR", "P = I/R", "P = R/I"],
          correctAnswer: 0,
          reason: "The electrical power dissipated in a resistor is given by P = I²R, where I is current and R is resistance."
        },
        {
          question: "The internal resistance of an ideal voltage source is:",
          options: ["Zero", "Infinite", "Equal to load resistance", "Variable"],
          correctAnswer: 0,
          reason: "An ideal voltage source has zero internal resistance, maintaining constant voltage regardless of current drawn."
        },
        {
          question: "According to Joule's law of heating, the heat produced is proportional to:",
          options: ["I²Rt", "IRt", "I²/R", "IR/t"],
          correctAnswer: 0,
          reason: "According to Joule's heating law, the heat produced is H = I²Rt, proportional to the square of current, resistance, and time."
        },
        {
          question: "The drift velocity of electrons in a conductor is typically in the order of:",
          options: ["mm/s", "km/s", "m/s", "Speed of light"],
          correctAnswer: 0,
          reason: "The drift velocity of electrons in a typical conductor is very slow, on the order of millimeters per second."
        },
        {
          question: "Which of the following affects the resistance of a conductor?",
          options: ["All of these", "Temperature", "Length", "Cross-sectional area"],
          correctAnswer: 0,
          reason: "Resistance is affected by temperature, length, cross-sectional area, and the material's resistivity."
        },
        {
          question: "The EMF of a battery is measured by:",
          options: ["Voltage when no current is drawn", "Voltage when current is flowing", "Current when shorted", "Power delivered to circuit"],
          correctAnswer: 0,
          reason: "The EMF (electromotive force) of a battery is measured by the voltage across its terminals when no current is drawn (open circuit)."
        },
        {
          question: "The SI unit of electrical conductivity is:",
          options: ["Siemens per meter (S/m)", "Ohm-meter (Ω·m)", "Siemens (S)", "Ohm (Ω)"],
          correctAnswer: 0,
          reason: "The SI unit of electrical conductivity is siemens per meter (S/m). Conductivity is the reciprocal of resistivity."
        },
        {
          question: "In a series RL circuit, the time constant is given by:",
          options: ["τ = L/R", "τ = RC", "τ = L·R", "τ = 1/RC"],
          correctAnswer: 0,
          reason: "In a series RL circuit, the time constant is τ = L/R, where L is inductance and R is resistance."
        },
        {
          question: "The terminal voltage of a battery with EMF E and internal resistance r when delivering current I is:",
          options: ["V = E - Ir", "V = E + Ir", "V = E·I·r", "V = E/Ir"],
          correctAnswer: 0,
          reason: "The terminal voltage is V = E - Ir due to the voltage drop across the internal resistance when delivering current."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Medium",
      averageScore: 0,
      userProgress: []
    });

    // 9. Electromagnetism
    const electromagnetismTest = new All({
      name: "Electromagnetism Test",
      description: "A comprehensive test covering magnetic fields, electromagnetic induction, and related phenomena.",
      type: "Chapter",
      chapter: new mongoose.Types.ObjectId("680325e4736d90f15e462bdb"), // Replace with actual chapter ID
      mcqs: [
        {
          question: "The magnetic force on a moving charge is maximum when the charge moves:",
          options: ["Perpendicular to the magnetic field", "Parallel to the magnetic field", "At 45° to the magnetic field", "In any direction"],
          correctAnswer: 0,
          reason: "The magnetic force on a moving charge is maximum when the charge moves perpendicular to the magnetic field direction."
        },
        {
          question: "Faraday's law of electromagnetic induction states that the induced EMF is proportional to:",
          options: ["Rate of change of magnetic flux", "Magnetic flux", "Current in the circuit", "Resistance of the circuit"],
          correctAnswer: 0,
          reason: "Faraday's law states that the induced EMF is proportional to the rate of change of magnetic flux through the circuit."
        },
        {
          question: "The magnetic field due to a long straight current-carrying wire varies with distance r as:",
          options: ["1/r", "1/r²", "r", "r²"],
          correctAnswer: 0,
          reason: "The magnetic field due to a long straight current-carrying wire decreases linearly with distance (1/r)."
        },
        {
          question: "Lenz's law is a consequence of the law of conservation of:",
          options: ["Energy", "Charge", "Momentum", "Mass"],
          correctAnswer: 0,
          reason: "Lenz's law is a consequence of the law of conservation of energy. The induced current produces effects that oppose the change causing it."
        },
        {
          question: "The SI unit of magnetic flux is:",
          options: ["Weber (Wb)", "Tesla (T)", "Ampere-meter (A·m)", "Henry (H)"],
          correctAnswer: 0,
          reason: "The SI unit of magnetic flux is the weber (Wb)."
        },
        {
          question: "The magnetic field inside a solenoid carrying current I is:",
          options: ["Uniform and parallel to the axis", "Non-uniform", "Circular around the axis", "Zero"],
          correctAnswer: 0,
          reason: "The magnetic field inside an ideal solenoid is uniform and parallel to its axis."
        },
        {
          question: "Ampere's law relates:",
          options: ["Line integral of magnetic field to the current enclosed", "Magnetic flux to EMF", "Electric field to magnetic field", "Force to current"],
          correctAnswer: 0,
          reason: "Ampere's law relates the line integral of the magnetic field around a closed loop to the electric current enclosed by the loop."
        },
        {
          question: "An electron moving perpendicular to a uniform magnetic field follows:",
          options: ["Circular path", "Straight line", "Parabolic path", "Helical path"],
          correctAnswer: 0,
          reason: "An electron moving perpendicular to a uniform magnetic field follows a circular path due to the magnetic force."
        },
        {
          question: "The mutual inductance between two coils depends on:",
          options: ["Their relative position and orientation", "Current flowing in them", "Resistance of the coils", "Capacitance between them"],
          correctAnswer: 0,
          reason: "Mutual inductance depends on the relative position, orientation, geometry of the coils, and the medium between them."
        },
        {
          question: "Self-inductance is the property of a circuit that opposes change in:",
          options: ["Current", "Voltage", "Resistance", "Capacitance"],
          correctAnswer: 0,
          reason: "Self-inductance is the property of a circuit that opposes changes in current flowing through it."
        },
        {
          question: "The direction of the induced current in a loop is determined by:",
          options: ["Lenz's law", "Ohm's law", "Coulomb's law", "Gauss's law"],
          correctAnswer: 0,
          reason: "The direction of induced current is determined by Lenz's law, which states that the induced current opposes the change causing it."
        },
        {
          question: "The magnetic field due to a current-carrying circular loop at its center is:",
          options: ["Perpendicular to the plane of the loop", "Parallel to the plane of the loop", "Zero", "Tangential to the loop"],
          correctAnswer: 0,
          reason: "The magnetic field at the center of a current-carrying circular loop is perpendicular to the plane of the loop."
        },
        {
          question: "Diamagnetic materials have a magnetic susceptibility that is:",
          options: ["Negative and small", "Positive and small", "Positive and large", "Zero"],
          correctAnswer: 0,
          reason: "Diamagnetic materials have a small negative magnetic susceptibility, meaning they are weakly repelled by magnetic fields."
        },
        {
          question: "The energy stored in an inductor L carrying current I is:",
          options: ["½LI²", "LI²", "LI", "I²/L"],
          correctAnswer: 0,
          reason: "The energy stored in an inductor is given by E = ½LI², where L is inductance and I is current."
        },
        {
          question: "The magnetic dipole moment of a current loop is:",
          options: ["IA", "I/A", "I²A", "A/I"],
          correctAnswer: 0,
          reason: "The magnetic dipole moment of a current loop is given by μ = IA, where I is current and A is the area of the loop."
        }
      ],
      numberOfMcqs: 15,
      duration: 30, // minutes
      difficulty: "Hard",
      averageScore: 0,
      userProgress: []
    });

    // Insert all tests into the database
    await Promise.all([
      rotationalMotionTest.save(),
      wavesSoundsTest.save(),
      oscillationsTest.save(),
      thermodynamicsTest.save(),
      electrostaticsTest.save(),
      currentElectricityTest.save(),
      electromagnetismTest.save()
    ]);

    console.log("All physics tests inserted successfully!");
  } catch (error) {
    console.error("Error inserting physics tests:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertPhysicsTests();