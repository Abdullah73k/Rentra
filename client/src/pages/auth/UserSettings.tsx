import React, { useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Key,
  Shield,
  Trash2,

  UserIcon,
  Settings,
} from "lucide-react"
import { mockUser } from "@/lib/mock-user"
import type { Passkey } from "@/lib/types"

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences">("profile")
  const [user, setUser] = useState(mockUser)
 



  const handleToggle2FA = () => {
    setUser({ ...user, twoFactorEnabled: !user.twoFactorEnabled })
  }

  const handleGeneratePasskey = () => {
    const newPasskey: Passkey = {
      id: `passkey-${Date.now()}`,
      name: `Passkey ${user.passkeys.length + 1}`,
      createdAt: new Date().toISOString(),
    }
    setUser({ ...user, passkeys: [...user.passkeys, newPasskey] })
  }

  const handleDeletePasskey = (passkeyId: string) => {
    setUser({ ...user, passkeys: user.passkeys.filter((p) => p.id !== passkeyId) })
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto">
        {/* Header */}
        <div className="border-b border-border px-6 py-6 bg-white">
          <Link to="/properties/dashboard">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information and security settings
          </p>
        </div>

        <div className="flex">
          {/* Left Sidebar Tabs */}
          <div className="w-64 bg-white border-r border-border min-h-screen p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <UserIcon className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "security"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <Shield className="h-5 w-5" />
                <span className="font-medium">Security</span>
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === "preferences"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Preferences</span>
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 max-w-4xl">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullName"
                          className="text-xs font-medium uppercase tracking-wide text-gray-600"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-xs font-medium uppercase tracking-wide text-gray-600"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={user.email}
                          disabled
                          className="h-12 rounded-lg border-gray-300 bg-gray-100 text-sm opacity-60 cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-xs font-medium uppercase tracking-wide text-gray-600"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+971 50 123 4567"
                          className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-xs font-medium uppercase tracking-wide text-gray-600"
                        >
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Company Name"
                          className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="country"
                        className="text-xs font-medium uppercase tracking-wide text-gray-600"
                      >
                        Country
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="United Arab Emirates"
                        className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Password Reset */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-muted-foreground" />
                      <CardTitle>Password</CardTitle>
                    </div>
                    <CardDescription>Request a password reset link via email</CardDescription>
                  </CardHeader>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                    </div>
                  <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Status:{" "}
                          {user.twoFactorEnabled ? (
                            <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                              Enabled
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="ml-2">
                              Disabled
                            </Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.twoFactorEnabled
                            ? "Your account is protected with two-factor authentication"
                            : "Enable 2FA to secure your account with an additional verification step"}
                        </p>
                      </div>
                      <Button
                        onClick={handleToggle2FA}
                        variant={user.twoFactorEnabled ? "destructive" : "default"}
                        className="rounded-full"
                      >
                        {user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Passkeys */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Key className="h-5 w-5 text-muted-foreground" />
                          <CardTitle>Passkeys</CardTitle>
                        </div>
                        <CardDescription>
                          Manage your passkeys for passwordless authentication
                        </CardDescription>
                      </div>
                      <Button
                        onClick={handleGeneratePasskey}
                        className="gap-2 rounded-full"
                      >
                        <Key className="h-4 w-4" />
                        Generate Passkey
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {user.passkeys.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Key className="h-12 w-12 mx-auto mb-3 opacity-40" />
                        <p className="text-sm">No passkeys configured</p>
                        <p className="text-xs mt-1">
                          Generate a passkey to enable passwordless authentication
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {user.passkeys.map((passkey) => (
                          <div
                            key={passkey.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-secondary rounded-full">
                                <Key className="h-4 w-4 text-secondary-foreground" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{passkey.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Created{" "}
                                  {new Date(passkey.createdAt).toLocaleDateString()}
                                </p>
                                {passkey.lastUsed && (
                                  <p className="text-xs text-muted-foreground">
                                    Last used{" "}
                                    {new Date(passkey.lastUsed).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button
                              onClick={() => handleDeletePasskey(passkey.id)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional & Financial Settings</CardTitle>
                    <CardDescription>
                      Configure your currency and tax preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currency"
                          className="text-xs font-medium uppercase tracking-wide text-gray-600"
                        >
                          Currency
                        </Label>
                        
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="vatRate"
                          className="text-xs font-medium uppercase tracking-wide text-gray-600"
                        >
                          VAT Rate (%)
                        </Label>
                        <Input
                          id="vatRate"
                          name="vatRate"
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          placeholder="5"
                          className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
