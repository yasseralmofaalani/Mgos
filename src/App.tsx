import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import PhasesSection from "@/components/PhasesSection";
import DatasetsSection from "@/components/DatasetsSection";
import FeatureClassesSection from "@/components/FeatureClassesSection";
import StandaloneTablesSection from "@/components/StandaloneTablesSection";
import RelationshipDiagramSection from "@/components/RelationshipDiagramSection";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <HeroSection />
      <CapabilitiesSection />
      <PhasesSection />
      <DatasetsSection />
      <FeatureClassesSection />
      <StandaloneTablesSection />
      <RelationshipDiagramSection />
      <TechStackSection />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
