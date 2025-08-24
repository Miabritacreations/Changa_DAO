import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

actor Changa_DAO_backend {

  // Define Milestone type
  public type Milestone = {
    name: Text;
    status: Text; // "completed", "in-progress", "pending"
  };

  // Define Project type
  public type Project = {
    id: Nat;
    name: Text;
    description: Text;
    location: Text;
    category: Text;
    categoryColor: Text;
    image: Text;
    fundingProgress: Nat; // percent 0-100
    raised: Nat;
    goal: Nat;
    milestones: [Milestone];
    team: Text;
    teamSize: Nat;
  };

  // Dummy project data
  let dummyProjects: [Project] = [
    {
      id = 1;
      name = "Clean Water Initiative";
      description = "Providing clean drinking water to rural communities.";
      location = "Kenya";
      category = "water";
      categoryColor = "#1E88E5";
      image = "https://via.placeholder.com/400x200/1E88E5/ffffff?text=Water+Project";
      fundingProgress = 70;
      raised = 7000;
      goal = 10000;
      milestones = [
        { name = "Survey", status = "completed" };
        { name = "Drilling", status = "in-progress" };
        { name = "Testing", status = "pending" }
      ];
      team = "WaterTeam";
      teamSize = 5;
    };
    {
      id = 2;
      name = "Solar Power for Schools";
      description = "Installing solar panels in schools to provide sustainable energy.";
      location = "Nigeria";
      category = "energy";
      categoryColor = "#FDD835";
      image = "https://via.placeholder.com/400x200/FDD835/000000?text=Energy+Project";
      fundingProgress = 45;
      raised = 4500;
      goal = 10000;
      milestones = [
        { name = "Planning", status = "completed" };
        { name = "Installation", status = "in-progress" };
        { name = "Maintenance", status = "pending" }
      ];
      team = "SolarTeam";
      teamSize = 4;
    }
  ];

  // Fetch projects
  public query func getProjects(): async [Project] {
    dummyProjects
  };
};
