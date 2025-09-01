"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Phone, Users, Mail, Weight, Globe, Edit, Plus, Trash2 } from "lucide-react"
import { EditPersonalDetailsModal } from "./edit-personal-details-modal"
import { EditHealthDetailsModal } from "./edit-health-details-modal"
import { AddAllergyModal } from "./add-allergy-modal"
import { AddMedicationModal } from "./add-medication-modal"

export function OverviewTab() {
  const [showEditPersonal, setShowEditPersonal] = useState(false)
  const [showEditHealth, setShowEditHealth] = useState(false)
  const [showAddAllergy, setShowAddAllergy] = useState(false)
  const [showAddMedication, setShowAddMedication] = useState(false)
  const [showEditMedication, setShowEditMedication] = useState(false)

  return (
    <div className="space-y-8">
      {/* Personal Details Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Personal Details</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowEditPersonal(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Patient ID</div>
                  <div className="font-medium">CUS.j2khfmvg3bz7q5r</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Age</div>
                  <div className="font-medium">27</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Phone Number</div>
                  <div className="font-medium">+1 168141116</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Race</div>
                  <div className="font-medium">Black / African American</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">olivia.br@example.com</div>
                  <Badge variant="secondary" className="text-xs mt-1">
                    Not verified
                  </Badge>
                  <Button variant="link" className="text-xs p-0 h-auto ml-2">
                    Verify Now
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Weight className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Weight</div>
                  <div className="font-medium">67kg</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Gender</div>
                  <div className="font-medium">Female</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Language Preference</div>
                  <div className="font-medium">English</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Medications Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Medications</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowEditMedication(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Pregabalin</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Gabapentin 75mg</div>
                <div className="text-sm text-gray-500">Twice Daily</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAddMedication(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add another medication
            </Button>
          </CardContent>
        </Card>

        {/* Allergies Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Allergies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Pollen</div>
                <div className="text-sm text-gray-500">Itchy nose and watery eyes</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Caffeine</div>
                <div className="text-sm text-gray-500">Sore throat</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Lactose intolerant</div>
                <div className="text-sm text-gray-500">Diarrhea and bloating</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAddAllergy(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add another allergy
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Health Profile Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Health Profile</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowEditHealth(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Blood Group</div>
                  <div className="font-medium">O+</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Hearing Impaired</div>
                  <div className="font-medium">No</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Primary Condition</div>
                  <div className="font-medium">Chronic Pain</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Genotype</div>
                  <div className="font-medium">AA</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vision Impaired</div>
                  <div className="font-medium">No</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Diagnosed</div>
                  <div className="font-medium">2024</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <EditPersonalDetailsModal open={showEditPersonal} onOpenChange={setShowEditPersonal} />
      <EditHealthDetailsModal open={showEditHealth} onOpenChange={setShowEditHealth} />
      <AddAllergyModal open={showAddAllergy} onOpenChange={setShowAddAllergy} />
      <AddMedicationModal open={showAddMedication} onOpenChange={setShowAddMedication} />
    </div>
  )
}
